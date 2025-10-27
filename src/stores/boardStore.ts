import { create } from 'zustand';
import { BOARD_CONSTANTS } from '../constants/board';
import { BoardStore, Board, BoardListItem, CreateBoardData, BoardCategory } from '../types/board';

export const useBoardStore = create<BoardStore>(set => ({
  // 필터 및 정렬 초기값
  selectedCategory: BOARD_CONSTANTS.ALL_CATEGORY,
  sortField: BOARD_CONSTANTS.DEFAULT_SORT_FIELD,
  sortDirection: BOARD_CONSTANTS.DEFAULT_SORT_DIRECTION,
  setSelectedCategory: (category: string) =>
    set({ selectedCategory: category }),
  setSortField: (field: string) => set({ sortField: field }),
  setSortDirection: (direction: 'asc' | 'desc') =>
    set({ sortDirection: direction }),

  // 모달 초기값
  showWriteModal: false,
  showActionModal: false,
  setShowWriteModal: (show: boolean) => set({ showWriteModal: show }),
  setShowActionModal: (show: boolean) => set({ showActionModal: show }),

  // 게시판 목록 초기값
  boards: [],
  allBoards: [], // 전체 게시글 (서버에서 가져온 원본 데이터)
  setBoards: (boards: BoardListItem[]) => set({ boards }),
  setAllBoards: (boards: BoardListItem[]) => set({ allBoards: boards }),

  // 현재 게시글 초기값
  currentBoard: null,
  setCurrentBoard: (board: Board | null) => set({ currentBoard: board }),

  // 페이지네이션 초기값
  currentPage: 0,
  totalPages: 0,
  totalElements: 0,
  pageSize: BOARD_CONSTANTS.DEFAULT_PAGE_SIZE as number,
  setCurrentPage: (page: number) => set({ currentPage: page }),
  setTotalPages: (pages: number) => set({ totalPages: pages }),
  setTotalElements: (elements: number) => set({ totalElements: elements }),
  setPageSize: (size: number) => set({ pageSize: size }),

  // 로딩 및 에러 초기값
  isLoading: false,
  isPaginationLoading: false,
  error: null,
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  setIsPaginationLoading: (loading: boolean) =>
    set({ isPaginationLoading: loading }),
  setError: (error: string | null) => set({ error }),

  // 폼 데이터 초기값
  editingBoard: null,
  formData: {
    title: '',
    content: '',
    category: BOARD_CONSTANTS.DEFAULT_CATEGORY as BoardCategory,
  },
  selectedFile: null,
  setEditingBoard: (board: Board | null) => set({ editingBoard: board }),
  setFormData: (data: CreateBoardData) => set({ formData: data }),
  setSelectedFile: (file: File | null) => set({ selectedFile: file }),
}));
