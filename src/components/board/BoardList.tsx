import { useNavigate } from 'react-router-dom';
import { BOARD_CONSTANTS } from '../../constants/board';
import BoardSkeleton from '../BoardSkeleton';
import { BoardListProps } from '../../types/components';


const BoardList = ({
  boards,
  categories,
  user,
  isLoading
}: BoardListProps) => {
  const navigate = useNavigate();

  // 카테고리에 따라 색상을 반환하는 함수
  const getCategoryColor = (category: string) => {
    return BOARD_CONSTANTS.CATEGORY_COLORS[category as keyof typeof BOARD_CONSTANTS.CATEGORY_COLORS] || BOARD_CONSTANTS.CATEGORY_COLORS.ETC;
  };

  if (isLoading) {
    return <BoardSkeleton count={10} />;
  }

  return (
    <div className="mt-4 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="divide-y divide-gray-200">
        {boards.map((board) => (
          <div 
            key={board.id} 
            className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 cursor-pointer border-b border-gray-200"
            onClick={() => navigate(`/boards/${board.id}`)}  // 클릭 시 상세 페이지로 이동
          >
            {/* 모바일 레이아웃 - 작은 화면에서 세로 배치 */}
            <div className="sm:hidden space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-medium text-gray-900 flex-1 mr-2">
                  {board.title}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(board.category)}`}>
                  {categories?.[board.category]}  {/* 카테고리 이름 표시 */}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>#{board.id}</span>  {/* 게시글 ID */}
                <span>{user?.name || '사용자'}</span>  {/* 작성자 */}
                <span>{new Date(board.createdAt).toLocaleDateString()}</span>  {/* 작성일 */}
              </div>
            </div>
            
            {/* 데스크톱 레이아웃 - 큰 화면에서 가로 배치 */}
            <div className="hidden sm:col-span-1 sm:flex sm:items-center">
              <span className="text-sm text-gray-600">
                {board.id}  {/* 게시글 ID */}
              </span>
            </div>
            <div className="hidden sm:col-span-5 sm:flex sm:items-center">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  {board.title}  {/* 게시글 제목 */}
                </h3>
              </div>
            </div>
            <div className="hidden sm:col-span-2 sm:flex sm:items-center text-sm text-gray-600">
              {user?.name || '사용자'}  {/* 작성자 */}
            </div>
            <div className="hidden sm:col-span-2 sm:flex sm:items-center text-sm">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(board.category)}`}>
                {categories?.[board.category]}  {/* 카테고리 배지 */}
              </span>
            </div>
            <div className="hidden sm:col-span-2 sm:flex sm:items-center text-sm text-gray-600">
              {new Date(board.createdAt).toLocaleDateString()}  {/* 작성일 */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardList;
