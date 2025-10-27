import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBoardList, useCategories } from './useBoardList';
import { useBoardDetail } from './useBoardDetail';
import { useBoardEventHandlers } from './useBoardEventHandlers';
import { useBoardStore } from '../stores/boardStore';
import { BOARD_CONSTANTS } from '../constants/board';

export const useBoard = () => {
  const { id } = useParams();
  const store = useBoardStore();
  const { loadAllBoards } = useBoardList();
  const { categories, loadCategories } = useCategories();
  const { loadBoard } = useBoardDetail();

  // 게시판 이벤트 핸들러
  const handlers = useBoardEventHandlers();

  // 게시판 목록 및 카테고리 초기 로드
  useEffect(() => {
    loadCategories();
    loadAllBoards();
  }, []);

  // 1. 카테고리 필터링
  let filtered = store.allBoards;
  if (store.selectedCategory !== BOARD_CONSTANTS.ALL_CATEGORY) {
    filtered = store.allBoards.filter(
      board => board.category === store.selectedCategory
    );
  }

  // 2. 정렬
  const sorted = [...filtered].sort((a, b) => {
    let aValue: number | string;
    let bValue: number | string;

    switch (store.sortField) {
      case 'id':
        aValue = a.id;
        bValue = b.id;
        break;
      case 'title':
        aValue = a.title;
        bValue = b.title;
        break;
      case 'category':
        aValue = a.category;
        bValue = b.category;
        break;
      case 'createdAt':
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
        break;
      default:
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
    }

    if (aValue < bValue) return store.sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return store.sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // 3. 페이지네이션
  const startIndex = store.currentPage * store.pageSize;
  const endIndex = startIndex + store.pageSize;
  const filteredBoards = sorted.slice(startIndex, endIndex);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(sorted.length / store.pageSize);
  const totalElements = sorted.length;

  // 게시글 상세 조회
  useEffect(() => {
    if (id) {
      loadBoard(parseInt(id));
    } else {
      // 게시글 상세 조회 초기화
      store.setCurrentBoard(null);
    }
  }, [id]);

  return {
    boards: filteredBoards,
    allBoards: store.allBoards,
    currentBoard: store.currentBoard,
    categories,
    isLoading: store.isLoading,
    isPaginationLoading: store.isPaginationLoading,
    error: store.error,
    currentPage: store.currentPage,
    totalPages,
    totalElements,
    pageSize: store.pageSize,
    editingBoard: store.editingBoard,
    formData: store.formData,
    selectedFile: store.selectedFile,
    selectedCategory: store.selectedCategory,
    sortField: store.sortField,
    sortDirection: store.sortDirection,
    showWriteModal: store.showWriteModal,
    showActionModal: store.showActionModal,
    setFormData: store.setFormData,
    setSelectedFile: store.setSelectedFile,
    setShowWriteModal: store.setShowWriteModal,
    setShowActionModal: store.setShowActionModal,
    handleSubmit: handlers.handleSubmit,
    handleDelete: handlers.handleDelete,
    handleEdit: handlers.handleEdit,
    handleCancel: handlers.handleCancel,
    handleFileChange: handlers.handleFileChange,
    handlePageChange: handlers.handlePageChange,
    handleCategoryChange: handlers.handleCategoryChange,
    handleSort: handlers.handleSort,
    handlePageSizeChange: handlers.handlePageSizeChange,
    loadAllBoards,
    loadBoard,
    loadCategories,
  };
};
