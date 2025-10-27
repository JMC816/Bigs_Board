import axios, { AxiosError } from 'axios';
import apiClient from './client';
import { SignUpRequest, SignUpResponse, SignInRequest } from '../types/auth';

// 회원가입 API 함수
export const signUp = async (
  signUpData: SignUpRequest
): Promise<SignUpResponse> => {
  try {
    await apiClient.post('/auth/signup', signUpData);
    return {
      success: true,
      message: '회원가입이 성공적으로 완료되었습니다.',
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const errorMessage =
      axiosError.response?.data?.message || '회원가입 중 오류가 발생했습니다.';
    return {
      success: false,
      message: errorMessage,
    };
  }
};

// 로그인 API 함수
export const signIn = async (signInData: SignInRequest) => {
  try {
    const response = await apiClient.post('/auth/signin', signInData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 리프레시 토큰 API 함수 (accessToken과 refreshToken 둘 다 재발급)
export const refreshToken = async (existRefreshToken: string) => {
  try {
    // apiClient를 사용하면 인터셉터가 실행되므로 직접 axios 사용
    const response = await axios.post(
      `${import.meta.env.DEV ? '/api' : 'https://front-mission.bigs.or.kr'}/auth/refresh`,
      { refreshToken: existRefreshToken },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      response.data;
    return {
      accessToken: newAccessToken, // 새 accessToken
      refreshToken: newRefreshToken, // 새 refreshToken (서버에서 항상 새로 발급)
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
