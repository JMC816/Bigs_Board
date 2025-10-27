import { AxiosError } from 'axios';
import { getBoard } from '../api/board';
import { BOARD_CONSTANTS, MESSAGES } from '../constants/board';
import { useBoardStore } from '../stores/boardStore';

export const useBoardDetail = () => {
  const { setIsLoading, setError, setCurrentBoard } = useBoardStore();

  // 게시글 상세 조회
  const loadBoard = async (boardId: number) => {
    try {
      setIsLoading(true);
      setError(null);
      // API 호출
      const board = await getBoard(boardId);
      setCurrentBoard(board);
      setTimeout(() => setIsLoading(false), BOARD_CONSTANTS.SKELETON_DELAY);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(
          error.response?.data?.message || MESSAGES.BOARD.DETAIL_LOAD_FAILED
        );
      }
      setIsLoading(false);
    }
  };

  return { loadBoard };
};
