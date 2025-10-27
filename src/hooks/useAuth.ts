import {
  setTokens,
  removeTokens,
  getAccessToken,
  getRefreshToken,
  hasTokens,
  isTokenExpired,
  isTokenExpiringSoon,
  getUserFromToken,
  getTokenTimeRemaining,
} from '../utils/token';
import { signIn, refreshToken } from '../api/auth';
import { useAuthStore } from '../stores/authStore';
import { useRef } from 'react';

export const useAuth = () => {
  const { isLogin, user, isLoading, setIsLogin, setUser, setIsLoading } =
    useAuthStore();

  // 토큰 자동 재발급 타이머 ref
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 토큰 재발급
  const refreshAccessToken = async () => {
    const existRefreshToken = getRefreshToken();

    // 리프레시 토큰 유효성 검사
    if (!existRefreshToken || existRefreshToken.trim() === '') {
      return false;
    }

    try {
      const result = await refreshToken(existRefreshToken);

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        result;

      // 새로운 토큰 저장 (리프레시 토큰도 새로 받은 것으로 교체)
      setTokens(newAccessToken, newRefreshToken);

      // 사용자 정보 업데이트
      const user = getUserFromToken(newAccessToken);
      setIsLogin(true);
      setUser(user);
      setIsLoading(false);

      return true;
    } catch (error) {
      console.error('토큰 재발급 실패:', error);

      // 토큰 삭제 및 상태 초기화
      removeTokens();
      setIsLogin(false);
      setUser(null);
      setIsLoading(false);

      return false;
    }
  };

  // 토큰 만료 시간에 맞춰 자동 재발급 스케줄링
  const scheduleTokenRefresh = () => {
    // 기존 타이머가 있으면 제거
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }

    const accessToken = getAccessToken();
    if (!accessToken) {
      return;
    }

    const timeRemaining = getTokenTimeRemaining(accessToken);

    // 이미 만료된 경우 즉시 재발급
    if (timeRemaining === 0) {
      refreshAccessToken();
      return;
    }

    // 만료 예정 30초 전에 재발급하도록 스케줄링 (실제 만료 30초 전)
    const refreshTime = Math.max(1000, (timeRemaining - 30) * 1000);

    refreshTimerRef.current = setTimeout(async () => {
      const success = await refreshAccessToken();

      if (success) {
        // 재발급 성공 시 새로운 토큰의 만료 시간에 맞춰 다시 스케줄링
        scheduleTokenRefresh();
      }
    }, refreshTime);
  };

  // 로그인
  const login = async (username: string, password: string) => {
    const result = await signIn({ username, password });
    const { accessToken, refreshToken } = result;

    // 토큰 저장
    setTokens(accessToken, refreshToken);

    const user = getUserFromToken(accessToken);
    setIsLogin(true);
    setUser(user);
    setIsLoading(false);

    // 토큰 자동 재발급 스케줄링
    scheduleTokenRefresh();
  };

  // 로그아웃
  const logout = () => {
    // 타이머 정리
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }

    removeTokens();
    setIsLogin(false);
    setIsLoading(false);
    setUser(null);
    window.location.href = '/login';
  };

  // 인증 상태 확인
  const checkAuthStatus = async () => {
    setIsLoading(true);

    // 토큰이 없는 경우
    if (!hasTokens()) {
      setIsLogin(false);
      setUser(null);
      setIsLoading(false);
      return;
    }

    const accessToken = getAccessToken();
    const refreshTokenValue = getRefreshToken();

    // Access Token이 유효한 경우
    if (accessToken && !isTokenExpired(accessToken)) {
      const user = getUserFromToken(accessToken);
      setIsLogin(true);
      setUser(user);
      setIsLoading(false);

      // 토큰 자동 재발급 스케줄링
      scheduleTokenRefresh();

      // 토큰이 곧 만료될 예정이면 미리 재발급
      if (isTokenExpiringSoon(accessToken) && refreshTokenValue) {
        const refreshSuccess = await refreshAccessToken();
        if (refreshSuccess) {
          // 재발급 성공 시 새로운 토큰으로 다시 스케줄링
          scheduleTokenRefresh();
        }
      }
      return;
    }

    // Access Token 만료 -> Refresh Token으로 갱신 시도
    if (refreshTokenValue) {
      const refreshSuccess = await refreshAccessToken();
      if (refreshSuccess) {
        setIsLoading(false);
        // 재발급 성공 시 자동 재발급 스케줄링
        scheduleTokenRefresh();
        return;
      }
    }

    setIsLogin(false);
    setUser(null);
    setIsLoading(false);
  };

  // 토큰 자동 갱신 체크 함수
  const checkAndRefreshToken = async () => {
    // 로그인 상태가 아니면 실행하지 않음
    if (!isLogin) {
      return;
    }

    const accessToken = getAccessToken();
    const refreshTokenValue = getRefreshToken();

    // 토큰이 없으면 종료
    if (!accessToken || !refreshTokenValue) {
      return;
    }

    // Access Token이 만료되었거나 곧 만료될 예정이면 재발급
    if (isTokenExpired(accessToken) || isTokenExpiringSoon(accessToken)) {
      await refreshAccessToken();
    }
  };

  return {
    isLogin,
    isLoading,
    user,
    login,
    logout,
    checkAuthStatus,
    refreshAccessToken,
    checkAndRefreshToken,
  };
};
