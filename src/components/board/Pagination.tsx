import { BOARD_CONSTANTS } from '../../constants/board';
import { PaginationProps } from '../../types/components';

const Pagination = ({
  currentPage,
  totalPages,
  isLoading,
  onPageChange
}: PaginationProps) => {

  // 페이지가 1개 이하면 페이지네이션 숨김
  if (totalPages <= 1) return null;


  // 페이지네이션에 표시할 페이지 번호 계산
  const maxButtons = BOARD_CONSTANTS.MAX_PAGE_BUTTONS; // 최대 5개 버튼 표시
  
  // 현재 페이지 앞으로 2개, 뒤로 2개 페이지 버튼을 보여주기 위한 시작점 계산
  const startPage = Math.max(0, currentPage - 2);
  const endPage = Math.min(totalPages - 1, startPage + maxButtons - 1);
  
  // 마지막 페이지 근처에서는 시작 페이지를 역산하여 항상 5개를 표시
  const adjustedStartPage = endPage === totalPages - 1 
    ? Math.max(0, endPage - maxButtons + 1) 
    : startPage;
  
  // 표시할 페이지 번호 배열 생성
  const pageNumbers = [];
  for (let i = 0; i < maxButtons; i++) {
    const pageNum = adjustedStartPage + i;
    if (pageNum > endPage) break; // 유효 범위를 벗어나면 중단
    pageNumbers.push(pageNum);
  }

  return (
    <div className="flex justify-center mt-6">
      <div className="flex gap-2">
        {/* 첫 페이지 버튼 - 항상 첫 번째 페이지(0)로 이동 */}
        <button
          onClick={() => onPageChange(0)}
          disabled={currentPage === 0}  // 현재가 첫 페이지면 비활성화
          className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          처음
        </button>
        
        {/* 이전 페이지 버튼 - 현재 페이지에서 1 감소 */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0 || isLoading}  // 첫 페이지이거나 로딩 중이면 비활성화
          className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          이전
        </button>
        
        {/* 페이지 번호 버튼들 */}
        {pageNumbers.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            disabled={isLoading}
            className={`px-3 py-2 border rounded-md ${
              currentPage === pageNum
                ? 'bg-blue-500 text-white border-blue-500'
                : 'border-gray-300 hover:bg-gray-50'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {pageNum + 1}
          </button>
        ))}
        
        {/* 다음 페이지 버튼 - 현재 페이지에서 1 증가 */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1 || isLoading}  // 마지막 페이지이거나 로딩 중이면 비활성화
          className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          다음
        </button>
        
        {/* 마지막 페이지 버튼 - 항상 마지막 페이지로 이동 */}
        <button
          onClick={() => onPageChange(totalPages - 1)}
          disabled={currentPage === totalPages - 1 || isLoading}  // 마지막 페이지이거나 로딩 중이면 비활성화
          className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          마지막
        </button>
      </div>
    </div>
  );
};

export default Pagination;
