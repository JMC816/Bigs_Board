const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

// 로컬스토리지에 저장
export const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

// Access Token 가져오기 (저장된 토큰만 사용)
export const getAccessToken = (): string | null => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  return token;
};

// Refresh Token 가져오기 (저장된 토큰만 사용)
export const getRefreshToken = (): string | null => {
  const token = localStorage.getItem(REFRESH_TOKEN_KEY);
  return token;
};

// 토큰 삭제 (로그아웃)
export const removeTokens = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

// 토큰 존재 여부 확인 (저장된 토큰만 확인)
export const hasTokens = (): boolean => {
  const hasAccess = localStorage.getItem(ACCESS_TOKEN_KEY);
  const hasRefresh = localStorage.getItem(REFRESH_TOKEN_KEY);

  return !!(hasAccess && hasRefresh);
};

// JWT 토큰 디코딩 (페이로드 정보 추출)
export const decodeToken = (token: string): any => {
  try {
    if (!token) {
      console.error('JWT 토큰이 존재하지 않습니다.', token);
      return null;
    }

    // JWT 토큰 형식 검증 (header.payload.signature)
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      console.error('JWT 토큰 형식이 올바르지 않습니다:', tokenParts.length);
      return null;
    }

    // payload 부분 추출 및 검증
    const base64Url = tokenParts[1];
    if (!base64Url) {
      console.error('JWT 토큰의 payload 부분이 없습니다');
      return null;
    }

    // base64로 변환
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    // UTF-8 문자열로 디코딩
    const jsonPayload = decodeURIComponent(
      // 바이너리 문자열로 디코딩
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('JWT 토큰 디코딩 실패:', error);
    return null;
  }
};

// 토큰 만료 여부 확인
export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  // 토큰 없으면 true
  if (!decoded || !decoded.exp) {
    return true;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  // 만료 시간이 현재 시간보다 작으면 만료
  return decoded.exp < currentTime;
};

// 토큰 만료까지 남은 시간
export const getTokenTimeRemaining = (token: string): number => {
  const decoded = decodeToken(token);
  // 토큰 없으면 0초
  if (!decoded || !decoded.exp) {
    return 0;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  // 토큰 만료사간 - 현재시간 -> 음수면 0초로 처리
  return Math.max(0, decoded.exp - currentTime);
};

// 토큰이 곧 만료될 예정인지 확인
export const isTokenExpiringSoon = (token: string): boolean => {
  const timeRemaining = getTokenTimeRemaining(token);
  // 30초 이하면 만료 예정
  const isExpiringSoon = timeRemaining <= 30;
  return isExpiringSoon;
};

// JWT에서 사용자 정보 추출
export const getUserFromToken = (token: string): { username: string; name: string } => {
  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.username || !decoded.name) {
      throw new Error('토큰에서 사용자 정보를 추출할 수 없습니다');
    }
    return { username: decoded.username, name: decoded.name };
  } catch (error) {
    console.error('사용자 정보 추출 실패:', error);
    throw error;
  }
};
