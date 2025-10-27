import apiClient from './client';
import {
  Board,
  BoardListResponse,
  CreateBoardData,
  UpdateBoardData,
} from '../types/board';

// FormData 생성
const createFormData = (
  data: CreateBoardData | UpdateBoardData,
  file?: File
): FormData => {
  const formData = new FormData();
  // blob 형태로 데이터를 받는다
  const jsonBlob = new Blob([JSON.stringify(data)], {
    type: 'application/json',
  });
  formData.append('request', jsonBlob);

  if (file) {
    formData.append('file', file);
  }

  return formData;
};

// 게시판 리스트
export const getBoardList = async (
  page: number = 0,
  size: number = 10,
  category?: string
): Promise<BoardListResponse> => {
  let url = `/boards?page=${page}&size=${size}`;

  if (category && category !== 'ALL') {
    url += `&category=${category}`;
  }

  const response = await apiClient.get(url);
  return response.data;
};

// 글 조회
export const getBoard = async (id: number): Promise<Board> => {
  const response = await apiClient.get(`/boards/${id}`);
  return response.data;
};

// 글 생성
export const createBoard = async (data: CreateBoardData, file?: File) => {
  const formData = createFormData(data, file);
  const response = await apiClient.post('/boards', formData);
  return response.data;
};

// 글 수정
export const updateBoard = async (
  id: number,
  data: UpdateBoardData,
  file?: File
) => {
  const formData = createFormData(data, file);
  await apiClient.patch(`/boards/${id}`, formData);
};

// 글 삭제
export const deleteBoard = async (id: number) => {
  await apiClient.delete(`/boards/${id}`);
};

// 카테고리
export const getBoardCategories = async () => {
  const response = await apiClient.get('/boards/categories');
  return response.data;
};
