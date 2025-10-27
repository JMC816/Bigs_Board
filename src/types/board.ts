// 게시판 카테고리 타입
export type BoardCategory = 'NOTICE' | 'FREE' | 'QNA' | 'ETC';

// 게시글 상세 정보
export interface Board {
  id: number;
  title: string;
  content: string;
  boardCategory: BoardCategory;
  imageUrl?: string;
  createdAt: string;
}

// 게시글 목록 항목
export interface BoardListItem {
  id: number;
  title: string;
  category: BoardCategory;
  createdAt: string;
}

// 게시글 목록 API 응답
export interface BoardListResponse {
  content: BoardListItem[];
  pageable: {
    // 페이지 정보
    pageNumber: number;
    pageSize: number;
    sort: {
      // 정렬 정보
      unsorted: boolean;
      sorted: boolean;
      empty: boolean;
    };
    offset: number; // 오프셋
    unpaged: boolean; // 페이징 여부
    paged: boolean; // 페이징 여부
  };
  totalPages: number; // 전체 페이지 수
  totalElements: number; // 전체 게시글 수
  last: boolean; // 마지막 페이지 여부
  numberOfElements: number; // 현재 페이지 게시글 수
  size: number; // 페이지 크기
  number: number; // 현재 페이지 번호
  sort: {
    // 정렬 정보
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  first: boolean; // 첫 페이지 여부
  empty: boolean; // 빈 페이지 여부
}

/**
 * 게시글 작성 데이터 타입
 */
export interface CreateBoardData {
  title: string; // 제목
  content: string; // 내용
  category: BoardCategory; // 카테고리
}

/**
 * 게시글 수정 데이터 타입
 */
export interface UpdateBoardData {
  title: string; // 제목
  content: string; // 내용
  category: BoardCategory; // 카테고리
}

/**
 * 게시판 카테고리 정보 타입
 * - 각 카테고리 코드와 표시명 매핑
 */
export interface BoardCategories {
  NOTICE: string; // 공지사항 표시명
  FREE: string; // 자유게시판 표시명
  QNA: string; // 질문과 답변 표시명
  ETC: string; // 기타 표시명
}

/**
 * 게시판 스토어 타입
 */
export interface BoardStore {
  // 필터 및 정렬
  selectedCategory: string;
  sortField: string;
  sortDirection: 'asc' | 'desc';
  setSelectedCategory: (category: string) => void;
  setSortField: (field: string) => void;
  setSortDirection: (direction: 'asc' | 'desc') => void;

  // 모달
  showWriteModal: boolean;
  showActionModal: boolean;
  setShowWriteModal: (show: boolean) => void;
  setShowActionModal: (show: boolean) => void;

  // 게시판 목록 데이터
  boards: BoardListItem[];
  allBoards: BoardListItem[];
  setBoards: (boards: BoardListItem[]) => void;
  setAllBoards: (boards: BoardListItem[]) => void;

  // 현재 게시글
  currentBoard: Board | null;
  setCurrentBoard: (board: Board | null) => void;

  // 페이지네이션
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  setCurrentPage: (page: number) => void;
  setTotalPages: (pages: number) => void;
  setTotalElements: (elements: number) => void;
  setPageSize: (size: number) => void;

  // 로딩 및 에러
  isLoading: boolean;
  isPaginationLoading: boolean;
  error: string | null;
  setIsLoading: (loading: boolean) => void;
  setIsPaginationLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // 폼 데이터
  editingBoard: Board | null;
  formData: CreateBoardData;
  selectedFile: File | null;
  setEditingBoard: (board: Board | null) => void;
  setFormData: (data: CreateBoardData) => void;
  setSelectedFile: (file: File | null) => void;
}
