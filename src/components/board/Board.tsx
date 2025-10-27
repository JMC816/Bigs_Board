import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBoard } from '../../hooks/useBoard';
import { MESSAGES } from '../../constants/board';
import BoardDetailSkeleton from '../BoardDetailSkeleton';
import BoardHeader from './BoardHeader';
import BoardList from './BoardList';
import BoardDetail from './BoardDetail';
import WriteModal from './WriteModal';
import Pagination from './Pagination';
import { useAuth } from '../../hooks/useAuth';

const Board = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();

  const {
    // 상태
    boards,
    currentBoard,
    categories,
    isLoading,
    isPaginationLoading,
    error,
    currentPage,
    totalPages,
    totalElements,
    pageSize,
    editingBoard,
    formData,
    selectedFile,
    selectedCategory,
    sortField,
    sortDirection,
    showActionModal,
    showWriteModal,

    // 액션
    setFormData,
    setShowActionModal,
    setShowWriteModal,
    handleSubmit,
    handleDelete,
    handleEdit,
    handleCancel,
    handleFileChange,
    handlePageChange,
    handleCategoryChange,
    handleSort,
    handlePageSizeChange,
  } = useBoard();

  // 모달 외부 클릭 시 모달 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showActionModal) {
        const target = event.target as HTMLElement;
        if (!target.closest('.action-modal-container')) {
          setShowActionModal(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showActionModal, setShowActionModal]);

  return (
    <div className="max-w-6xl p-6 mx-auto">
      {/* 에러 메시지 */}
      {error && (
        <div className="px-4 py-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
          {error}
        </div>
      )}

      {/* 게시판 헤더 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">게시판</h1>
        </div>
        <div className="flex gap-2">
          {currentBoard && (
            <button
              onClick={() => navigate('/board')}
              className="px-4 py-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-600"
            >
              목록으로
            </button>
          )}
        </div>
      </div>

      {/* 글쓰기 모달 */}
      <WriteModal
        isOpen={showWriteModal}
        isEditing={!!editingBoard}
        isLoading={isLoading}
        formData={formData}
        selectedFile={selectedFile}
        categories={categories}
        onClose={() => {
          setShowWriteModal(false);
          handleCancel();
        }}
        onSubmit={handleSubmit}
        onFormDataChange={setFormData}
        onFileChange={handleFileChange}
      />

      {/* 게시글 상세 보기 */}
      {id && (
        <>
          {isLoading ? (
            <BoardDetailSkeleton />
          ) : currentBoard ? (
            <BoardDetail
              board={currentBoard}
              categories={categories}
              user={user}
              showActionModal={showActionModal}
              onActionModalToggle={() => setShowActionModal(!showActionModal)}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <div className="py-8 text-center">
              <p className="text-gray-500">{MESSAGES.BOARD.NOT_FOUND}</p>
            </div>
          )}
        </>
      )}

      {/* 게시글 목록 */}
      {!id && (
        <>
          <BoardHeader
            totalElements={totalElements}
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            onNewPostClick={() => setShowWriteModal(true)}
            onBackToList={() => navigate('/board')}
            showForm={showWriteModal}
            isLoading={isLoading}
            currentBoard={currentBoard}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
            pageSize={pageSize}
            onPageSizeChange={handlePageSizeChange}
          />

          <BoardList
            boards={boards}
            categories={categories}
            user={user}
            isLoading={isLoading}
          />

          {/* 페이지네이션 */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            isLoading={isPaginationLoading}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default Board;
