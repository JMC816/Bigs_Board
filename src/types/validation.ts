import { z } from 'zod';
// 비밀번호 스키마 (회원가입용)
const passwordSchema = z
  .string()
  .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
    '비밀번호는 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다');

// 로그인 스키마
export const loginSchema = z.object({
  username: z.string().min(1, '사용자명을 입력해주세요'),
  password: z.string().min(1, '비밀번호를 입력해주세요'),
});

// 회원가입 스키마
export const signUpSchema = z.object({
  username: z.string().min(2, '사용자명은 최소 2자 이상이어야 합니다'),
  name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다'),
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다',
  path: ['confirmPassword'],
});


// 로그인 폼 데이터 타입
export type LoginFormData = z.infer<typeof loginSchema>;


// 회원가입 폼 데이터 타입
export type SignUpFormData = z.infer<typeof signUpSchema>;
