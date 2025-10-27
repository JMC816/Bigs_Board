export const BOARD_CONSTANTS = {
  // 기본 페이지 크기
  DEFAULT_PAGE_SIZE: 10,
  // 페이지네이션에서 표시할 최대 페이지 버튼 수
  MAX_PAGE_BUTTONS: 5,

  CATEGORY_COLORS: {
    NOTICE: 'bg-blue-100 text-blue-800',
    FREE: 'bg-green-100 text-green-800',
    QNA: 'bg-purple-100 text-purple-800',
    ETC: 'bg-gray-100 text-gray-800',
  },

  // 기본 카테고리
  DEFAULT_CATEGORY: 'NOTICE',
  // 전체 카테고리 필터
  ALL_CATEGORY: 'ALL',

  // 기본 정렬 필드
  DEFAULT_SORT_FIELD: 'createdAt',
  // 기본 정렬 방향 (최신순)
  DEFAULT_SORT_DIRECTION: 'desc' as const,

  // 스켈레톤 UI 표시 지연 시간 (ms)
  SKELETON_DELAY: 500,
} as const;

export const MESSAGES = {
  BOARD: {
    LOAD_FAILED: '게시글 목록을 불러오는데 실패했습니다.',
    DETAIL_LOAD_FAILED: '게시글을 불러오는데 실패했습니다.',
    DELETE_CONFIRM: '정말로 이 게시글을 삭제하시겠습니까?',
    DELETE_SUCCESS: '게시글이 성공적으로 삭제되었습니다.',
    UPDATE_SUCCESS: '게시글이 성공적으로 수정되었습니다.',
    SAVE_FAILED: '게시글 저장에 실패했습니다.',
    NOT_FOUND: '게시글을 찾을 수 없습니다.',
  },
  NETWORK: {
    CONNECTION_ERROR:
      '네트워크 연결을 확인해주세요. 서버에 연결할 수 없습니다.',
    REQUEST_ERROR: '요청 형식이 잘못되었습니다.',
  },
} as const;
