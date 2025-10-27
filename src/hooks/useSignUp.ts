import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../api/auth';
import { SignUpRequest } from '../types/auth';
import { signUpSchema, SignUpFormData } from '../types/validation';
import { SIGNUP_CONSTANTS } from '../constants/signup';
import { z } from 'zod';
import { useAuth } from './useAuth';

export const useSignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState<SignUpFormData>({
    username: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // 입력 변경 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // 이름 입력 시 해당 필드의 에러 메시지 초기화
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // 폼 유효성 검사
  const validateForm = (): boolean => {
    try {
      signUpSchema.parse(formData);
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

  // 자동 로그인 처리
  const handleAutoLogin = async (username: string, password: string) => {
    try {
      await login(username, password);

      // 로그인 성공 시 게시판으로 이동
      window.location.href = '/board';
    } catch (loginError) {
      // 로그인 실패 시 로그인 페이지로 즉시 이동
      navigate('/login');
    }
  };

  // 폼 제출 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const signUpData: SignUpRequest = {
        username: formData.username,
        name: formData.name,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };

      const result = await signUp(signUpData);

      if (result.success) {
        // 자동 로그인 시도
        await handleAutoLogin(formData.username, formData.password);
      } else {
        setErrors({ submit: result.message });
      }
    } catch (error) {
      setErrors({ submit: SIGNUP_CONSTANTS.MESSAGES.SIGNUP_ERROR });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    handleInputChange,
    handleSubmit,
  };
};
