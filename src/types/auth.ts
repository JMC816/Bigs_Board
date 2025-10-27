// 사용자 정보
export interface User {
  username: string;
  name: string;
}

// 회원가입 요청
export interface SignUpRequest {
  username: string;
  name: string;
  password: string;
  confirmPassword: string;
}

// 회원가입 응답
export interface SignUpResponse {
  success: boolean;
  message: string;
}

// 로그인 요청
export interface SignInRequest {
  username: string;
  password: string;
}

export type AuthState = {
  isLogin: boolean;
  user: User | null;
  isLoading: boolean;
  setIsLogin: (value: boolean) => void;
  setUser: (user: User | null) => void;
  setIsLoading: (value: boolean) => void;
};
