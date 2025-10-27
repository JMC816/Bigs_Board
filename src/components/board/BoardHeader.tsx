import { BoardHeaderProps } from '../../types/components';
import CustomDropdown from './CustomDropdown';

const BoardHeader  = ({
  totalElements,
  categories,
  selectedCategory,
  onCategoryChange,
  onNewPostClick,
  onBackToList,
  showForm,
  isLoading,
  currentBoard,
  sortField,
  sortDirection,
  onSort,
  pageSize,
  onPageSizeChange
}: BoardHeaderProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* 상단 컨트롤 영역 */}
      <div className="px-4 sm:px-6 py-4 bg-gray-50 border-b">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h2 className="text-base sm:text-lg font-semibold">
            게시글 목록 ({totalElements}개)
          </h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <CustomDropdown
              label="카테고리 필터"
              value={selectedCategory}
              options={[
                { value: 'ALL', label: '전체' },
                ...(categories ? Object.entries(categories).map(([key, value]) => ({ value: key, label: value })) : [])
              ]}
              onChange={(value) => onCategoryChange(String(value))}
              className="w-full sm:w-auto"
            />
            <CustomDropdown
              label="페이지당 표시"
              value={pageSize}
              options={[
                { value: 10, label: '10개' },
                { value: 50, label: '50개' },
                { value: 100, label: '100개' }
              ]}
              onChange={(value) => onPageSizeChange(Number(value))}
              className="w-full sm:w-auto"
            />
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={onNewPostClick}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 sm:px-4 rounded text-sm w-full sm:w-auto"
                disabled={isLoading}
              >
                {showForm ? '글쓰기 취소' : '새 글 작성'}
              </button>
              {currentBoard && (
                <button
                  onClick={onBackToList}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
                >
                  목록으로
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* 테이블 헤더 */}
      <div className="bg-gray-100 border-b">
        <div className="hidden sm:grid sm:grid-cols-12 sm:gap-4 sm:px-6 sm:py-3 text-sm font-medium text-gray-700">
          <div className="col-span-1 flex items-center">
            <button 
              onClick={() => onSort('id')}
              className="flex items-center hover:text-blue-600"
            >
              번호
              {sortField === 'id' && (
                <span className="ml-1">
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </button>
          </div>
          <div className="col-span-5 flex items-center">
            <button 
              onClick={() => onSort('title')}
              className="flex items-center hover:text-blue-600"
            >
              제목
              {sortField === 'title' && (
                <span className="ml-1">
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </button>
          </div>
          <div className="col-span-2 flex items-center text-sm font-medium text-gray-700">
            글쓴이
          </div>
          <div className="col-span-2 flex items-center">
            <button 
              onClick={() => onSort('category')}
              className="flex items-center hover:text-blue-600"
            >
              카테고리
              {sortField === 'category' && (
                <span className="ml-1">
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </button>
          </div>
          <div className="col-span-2 flex items-center">
            <button 
              onClick={() => onSort('createdAt')}
              className="flex items-center hover:text-blue-600"
            >
              작성일
              {sortField === 'createdAt' && (
                <span className="ml-1">
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardHeader;