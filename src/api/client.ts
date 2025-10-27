import axios from 'axios';
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  removeTokens,
  getUserFromToken,
} from '../utils/token';
import { useAuthStore } from '../stores/authStore';

const API_BASE_URL = import.meta.env.DEV
  ? '/api'
  : 'https://front-mission.bigs.or.kr';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 전: 토큰 자동 추가
apiClient.interceptors.request.use(config => {
  const token = getAccessToken();
  // 인증 관련 주소가 아니고 Authorization 헤더가 아직 설정되지 않은 경우에만 토큰 추가
  if (
    token &&
    !config.url?.includes('/auth/') &&
    !config.headers.Authorization
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // 이미지 파일 업로드를 위해 Content-Type 삭제
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  return config;
});

// 응답 후: 401 에러 처리
apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // 401 에러가 아니거나 이미 재시도한 경우 무시
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      // 토큰 재발급
      const refreshTokenValue = getRefreshToken();
      if (!refreshTokenValue) {
        throw new Error('리프레시 토큰이 없습니다');
      }

      // 리프레시 토큰으로 새로운 액세스 토큰과 리프레시 토큰 재발급
      const response = await axios.post(
        `${API_BASE_URL}/auth/refresh`,
        { refreshToken: refreshTokenValue },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          validateStatus: () => true, // 모든 상태 코드 허용
        }
      );

      // 200이 아니면 재발급 실패
      if (response.status !== 200 || !response.data) {
        throw new Error('토큰 재발급 실패');
      }

      const { accessToken, refreshToken: newRefreshToken } = response.data;

      // 새로운 액세스 토큰과 리프레시 토큰이 모두 있는지 확인
      if (!accessToken) {
        throw new Error('새로운 액세스 토큰을 받지 못했습니다');
      }

      // 새로운 리프레시 토큰이 있으면 사용, 없으면 기존 것 유지
      const finalRefreshToken = newRefreshToken || refreshTokenValue;

      // 두 토큰 모두 새로 받은 것으로 저장
      setTokens(accessToken, finalRefreshToken);

      // authStore 업데이트 (자동 재로그인)
      try {
        const user = getUserFromToken(accessToken);
        useAuthStore.getState().setIsLogin(true);
        useAuthStore.getState().setUser(user);
        useAuthStore.getState().setIsLoading(false);
      } catch (error) {
        console.error('사용자 정보 업데이트 실패:', error);
      }

      // 원래 요청 재시도
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return apiClient(originalRequest);
    } catch (error) {
      // 재발급 실패 시 로그아웃 처리
      console.error('토큰 재발급 실패:', error);

      // 토큰 삭제 및 인증 상태 초기화
      removeTokens();
      useAuthStore.getState().setIsLogin(false);
      useAuthStore.getState().setUser(null);
      useAuthStore.getState().setIsLoading(false);

      // 로그인 페이지로 리다이렉트
      window.location.href = '/login';
      return Promise.reject(error);
    }
  }
);

export default apiClient;
