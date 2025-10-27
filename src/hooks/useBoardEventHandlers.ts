import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { Board as BoardType, BoardCategory } from '../types/board';
import { createBoard, updateBoard, deleteBoard } from '../api/board';
import { BOARD_CONSTANTS, MESSAGES } from '../constants/board';
import { useBoardStore } from '../stores/boardStore';
import { useBoardList } from './useBoardList';
import { useBoardDetail } from './useBoardDetail';

export const useBoardEventHandlers = () => {
  const { loadAllBoards } = useBoardList();
  const { loadBoard } = useBoardDetail();
  const navigate = useNavigate();

  const {
    editingBoard,
    formData,
    selectedFile,
    currentBoard,
    sortField,
    sortDirection,
    setEditingBoard,
    setFormData,
    setSelectedFile,
    setShowWriteModal,
    setError,
    setIsLoading,
    setSelectedCategory,
    setSortField,
    setSortDirection,
    setPageSize,
    setCurrentPage,
  } = useBoardStore();

  // 게시글 재로드
  const reloadList = () => {
    return loadAllBoards();
  };


  // 글 작성/수정 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 수정용
      // 수정할려는 글 내용이 존재하면 API 호출
      if (editingBoard) {
        await updateBoard(editingBoard.id, formData, selectedFile ?? undefined);
        setEditingBoard(null);
        alert(MESSAGES.BOARD.UPDATE_SUCCESS);
        // 게시글 상세 조회
        await loadBoard(editingBoard.id);
        navigate(`/boards/${editingBoard.id}`);
      } else {
        // 작성용
        await createBoard(formData, selectedFile ?? undefined);
      }

      // 폼 및 파일 초기화, 모달 닫기
      setFormData({
        title: '',
        content: '',
        category: BOARD_CONSTANTS.DEFAULT_CATEGORY as BoardCategory,
      });
      setSelectedFile(null);
      setShowWriteModal(false);

      // 게시판 목록 리로드
      await reloadList();
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message || MESSAGES.BOARD.SAVE_FAILED);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 글 삭제 핸들러
  const handleDelete = async (boardId: number) => {
    if (!window.confirm(MESSAGES.BOARD.DELETE_CONFIRM)) return;

    try {
      setIsLoading(true);
      setError(null);
      await deleteBoard(boardId);
      await reloadList();
      if (currentBoard?.id === boardId) navigate('/board');
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      setError(error.response?.data?.message || MESSAGES.BOARD.DELETE_CONFIRM);
    } finally {
      setIsLoading(false);
    }
  };

  // 글 수정
  const handleEdit = (board: BoardType) => {
    setEditingBoard(board);
    setFormData({
      title: board.title,
      content: board.content,
      category: board.boardCategory,
    });
    setShowWriteModal(true);
  };

  // 글 작성/수정 취소
  const handleCancel = () => {
    setFormData({
      title: '',
      content: '',
      category: BOARD_CONSTANTS.DEFAULT_CATEGORY as BoardCategory,
    });
    setSelectedFile(null);
    setShowWriteModal(false);
    setEditingBoard(null);
  };

  // 파일 선택
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0] ?? null);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // useEffect에서 자동으로 재로드됨
  };

  // 카테고리 변경 핸들러
  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory);
    setCurrentPage(0);
    // useEffect에서 자동으로 재로드됨
  };

  // 정렬 변경 핸들러
  const handleSort = (field: string) => {
    if (field === 'author') return;
    const newDirection =
      sortField === field
        ? sortDirection === 'asc'
          ? 'desc'
          : 'asc'
        : 'asc';
    setSortField(field);
    setSortDirection(newDirection);
    // 정렬 변경 시 현재 페이지 유지 (페이지 초기화하지 않음)
    // useEffect에서 자동으로 재로드됨
  };

  // 페이지 크기 변경 핸들러
  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(0);
    // useEffect에서 자동으로 재로드됨
  };

  return {
    handleSubmit,
    handleDelete,
    handleEdit,
    handleCancel,
    handleFileChange,
    handlePageChange,
    handleCategoryChange,
    handleSort,
    handlePageSizeChange,
  };
};
