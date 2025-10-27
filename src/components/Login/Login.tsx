import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { loginSchema, LoginFormData } from '../../types/validation';
import { z } from 'zod';
import { AxiosError } from 'axios';

const Login = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState<string>('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // 입력 시 해당 필드의 에러 메시지 초기화
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // 로그인 에러 메시지도 초기화
    if (loginErrorMessage) {
      setLoginErrorMessage('');
    }
  };

  const validateForm = (): boolean => {
    try {
      loginSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // 로그인 에러 메시지 초기화
    setLoginErrorMessage('');
    setIsLoading(true);

    try {
      // 로그인 API
      await login(formData.username, formData.password);
      navigate('/board', { replace: true });
    } catch (error) {
      if (error instanceof AxiosError) { 
      let errorMessage = '로그인 중 오류가 발생했습니다.';
      // 서버에서 받은 메시지를 우선적으로 사용 (400 에러의 경우)
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 401) {
        errorMessage = '이메일 또는 비밀번호가 올바르지 않습니다.';
      } else if (error.response?.status === 400) {
        errorMessage = '입력한 정보를 다시 확인해주세요.';
      } else if (error.response?.status === 500) {
        errorMessage =
          '서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
      } else if (error.code === 'ERR_NETWORK') {
        errorMessage = '인터넷 연결을 확인하고 다시 시도해주세요.';
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = '요청 시간이 초과되었습니다. 다시 시도해주세요.';
      } else if (error.message) {
        errorMessage = error.message;
      }
        console.error(errorMessage);
        setLoginErrorMessage(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8 bg-gray-50 sm:py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6 sm:space-y-8">
        <div>
          <h2 className="mt-4 text-2xl font-extrabold text-center text-gray-900 sm:mt-6 sm:text-3xl">
            로그인
          </h2>
        </div>

        <form
          className="mt-6 space-y-4 sm:mt-8 sm:space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="username" className="sr-only">
                이메일
              </label>
              <input
                id="username"
                name="username"
                type="email"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-3 sm:py-2 border ${
                  errors.username ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm sm:text-sm`}
                placeholder="이메일 주소"
                value={formData.username}
                onChange={handleInputChange}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-3 sm:py-2 border ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm sm:text-sm`}
                placeholder="비밀번호"
                value={formData.password}
                onChange={handleInputChange}
              />
              {/* Zod 검증 에러 메시지 */}
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}

              {/* 로그인 실패 에러 메시지 */}
              {loginErrorMessage && (
                <div className="p-3 mt-2 border border-red-200 rounded-md bg-red-50">
                  <div className="flex items-center">
                    <svg
                      className="flex-shrink-0 w-4 h-4 mr-2 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-sm font-medium text-red-700">
                      {loginErrorMessage}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="relative flex justify-center w-full px-4 py-3 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md group sm:py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '확인중...' : '로그인'}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            계정이 없으신가요?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              회원가입
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
