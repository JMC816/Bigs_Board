// 회원가입 관련 상수들
export const SIGNUP_CONSTANTS = {
  // 폼 필드명
  FORM_FIELDS: {
    USERNAME: 'username',
    NAME: 'name',
    PASSWORD: 'password',
    CONFIRM_PASSWORD: 'confirmPassword',
  },

  // 메시지
  MESSAGES: {
    SIGNUP_SUCCESS: '회원가입이 완료되었습니다.',
    SIGNUP_ERROR: '회원가입 중 오류가 발생했습니다.',
    LOGIN_REDIRECT: '로그인 페이지로 이동합니다...',
    PROCESSING: '확인중...',
    SIGNUP_BUTTON: '회원가입',
  },
} as const;

// 폼 레이블
export const FORM_LABELS = {
  EMAIL: '이메일',
  USERNAME: '사용자 이름',
  PASSWORD: '비밀번호',
  CONFIRM_PASSWORD: '비밀번호 확인',
} as const;

// 플레이스홀더
export const PLACEHOLDERS = {
  EMAIL: '이메일 주소',
  USERNAME: '사용자 이름',
  PASSWORD: '비밀번호 (8자 이상, 숫자, 영문자, 특수문자(!%*#?&) 포함)',
  CONFIRM_PASSWORD: '비밀번호 확인',
} as const;
