import { useState } from 'react';
import { getBoardList, getBoardCategories } from '../api/board';
import { BoardCategories } from '../types/board';
import { MESSAGES } from '../constants/board';
import { useBoardStore } from '../stores/boardStore';
import { AxiosError } from 'axios';

export const useBoardList = () => {
  const {
    setAllBoards,
    setError,
    setIsLoading,
  } = useBoardStore();

  // 전체 게시글 로드 (클라이언트 사이드 필터링용)
  const loadAllBoards = async () => {
    setError(null);
    setIsLoading(true);

    try {
      // 페이지네이션 없이 전체 데이터 가져오기 (큰 수의 size 설정)
      const response = await getBoardList(
        0,
        1000, // 충분히 큰 수
        undefined // 카테고리 필터 없이 전체 가져오기
      );

      // 전체 게시글 저장
      setAllBoards(response.content);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('게시판 목록 로드 실패:', error);
        setError(error.message || MESSAGES.BOARD.LOAD_FAILED);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { loadAllBoards };
};

export const useCategories = () => {
  const [categories, setCategories] = useState<BoardCategories | null>(null);

  // 게시판 카테고리 목록
  const loadCategories = async () => {
    try {
      // API 호출
      const categoriesData = await getBoardCategories();
      // 카테고리 상태 업데이트
      setCategories(categoriesData);
    } catch (error) {
      if(error instanceof AxiosError) {
        console.error('카테고리 로드 실패:', error);
      } 
    }
  };

  return { categories, loadCategories };
};

