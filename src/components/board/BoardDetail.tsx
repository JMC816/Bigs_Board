import { BOARD_CONSTANTS } from '../../constants/board';
import { BoardDetailProps } from '../../types/components';


const BoardDetail = ({
  board,
  categories,
  user,
  showActionModal,
  onActionModalToggle,
  onEdit,
  onDelete
} : BoardDetailProps ) => {
 
  const getCategoryColor = (category: string) => {
    return BOARD_CONSTANTS.CATEGORY_COLORS[category as keyof typeof BOARD_CONSTANTS.CATEGORY_COLORS] || BOARD_CONSTANTS.CATEGORY_COLORS.ETC;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      {/* 게시글 헤더 - 제목, 카테고리, 액션 버튼 */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-900">{board.title}</h2>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(board.boardCategory)}`}>
             {/* 카테고리 배지 */}
            {categories?.[board.boardCategory]} 
          </span>
        </div>
        
        {/* 액션 버튼 (점 3개 메뉴) */}
        <div className="relative action-modal-container">
          <button
            onClick={onActionModalToggle}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </button>
          
          {/* 액션 모달 드롭다운 메뉴 */}
          {showActionModal && (
            <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-10">
              <div className="py-1">
                <button
                  onClick={() => {
                    onEdit(board);  // 수정 모드로 전환
                    onActionModalToggle();  // 모달 닫기
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  수정
                </button>
                <button
                  onClick={() => {
                    onDelete(board.id);  // 삭제 실행
                    onActionModalToggle();  // 모달 닫기
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  삭제
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    
      {/* 게시글 본문 */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          {/* 첨부 이미지 표시 */}
          {board.imageUrl && (
            <div className="mb-4">
              <img 
                src={`https://front-mission.bigs.or.kr${board.imageUrl}`} 
                alt="첨부 이미지" 
                className="max-w-full h-auto rounded"
              />
            </div>
          )}
          
          {/* 게시글 내용 - 줄바꿈 유지 */}
          <div className="text-gray-700 whitespace-pre-wrap">
            {board.content}
          </div>
          
          {/* 작성자 정보 및 작성일 */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-600">
              {user?.name || '사용자'}  {/* 작성자 이름 */}
            </div>
            <div className="text-sm text-gray-600">
              {new Date(board.createdAt).toLocaleString()}  {/* 작성일시 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
