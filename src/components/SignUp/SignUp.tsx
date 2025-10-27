import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignUp } from '../../hooks/useSignUp';
import { SIGNUP_CONSTANTS, FORM_LABELS, PLACEHOLDERS } from '../../constants/signup';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { formData, errors, isLoading, handleInputChange, handleSubmit } = useSignUp();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 sm:space-y-8">
        <div>
          <h2 className="mt-4 sm:mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
            회원가입
          </h2>
        </div>
        
        <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {/* 이메일 입력 */}
            <div>
              <label htmlFor={SIGNUP_CONSTANTS.FORM_FIELDS.USERNAME} className="sr-only">
                {FORM_LABELS.EMAIL}
              </label>
              <input
                id={SIGNUP_CONSTANTS.FORM_FIELDS.USERNAME}
                name={SIGNUP_CONSTANTS.FORM_FIELDS.USERNAME}
                type="email"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-3 sm:py-2 border ${
                  errors.username ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm sm:text-sm`}
                placeholder={PLACEHOLDERS.EMAIL}
                value={formData.username}
                onChange={handleInputChange}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username}</p>
              )}
            </div>
            
            {/* 사용자 이름 입력 */}
            <div>
              <label htmlFor={SIGNUP_CONSTANTS.FORM_FIELDS.NAME} className="sr-only">
                {FORM_LABELS.USERNAME}
              </label>
              <input
                id={SIGNUP_CONSTANTS.FORM_FIELDS.NAME}
                name={SIGNUP_CONSTANTS.FORM_FIELDS.NAME}
                type="text"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-3 sm:py-2 border ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm sm:text-sm`}
                placeholder={PLACEHOLDERS.USERNAME}
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
            
            {/* 비밀번호 입력 */}
            <div>
              <label htmlFor={SIGNUP_CONSTANTS.FORM_FIELDS.PASSWORD} className="sr-only">
                {FORM_LABELS.PASSWORD}
              </label>
              <input
                id={SIGNUP_CONSTANTS.FORM_FIELDS.PASSWORD}
                name={SIGNUP_CONSTANTS.FORM_FIELDS.PASSWORD}
                type="password"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-3 sm:py-2 border ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm sm:text-sm`}
                placeholder={PLACEHOLDERS.PASSWORD}
                value={formData.password}
                onChange={handleInputChange}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            
            {/* 비밀번호 확인 입력 */}
            <div>
              <label htmlFor={SIGNUP_CONSTANTS.FORM_FIELDS.CONFIRM_PASSWORD} className="sr-only">
                {FORM_LABELS.CONFIRM_PASSWORD}
              </label>
              <input
                id={SIGNUP_CONSTANTS.FORM_FIELDS.CONFIRM_PASSWORD}
                name={SIGNUP_CONSTANTS.FORM_FIELDS.CONFIRM_PASSWORD}
                type="password"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-3 sm:py-2 border ${
                  errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm sm:text-sm`}
                placeholder={PLACEHOLDERS.CONFIRM_PASSWORD}
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
              
              {/* 회원가입 실패 에러 메시지 */}
              {errors.submit && (
                <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-red-700 font-medium">{errors.submit}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 제출 버튼 */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 sm:py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? SIGNUP_CONSTANTS.MESSAGES.PROCESSING : SIGNUP_CONSTANTS.MESSAGES.SIGNUP_BUTTON}
            </button>
          </div>
        </form>

        {/* 로그인 링크 */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            이미 계정이 있으신가요?{' '}
            <button
              onClick={() => navigate('/login')}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              로그인
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;