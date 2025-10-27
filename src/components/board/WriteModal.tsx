import { BoardCategory } from '../../types/board';
import { WriteModalProps } from '../../types/components';

const WriteModal = ({
  isOpen,
  isEditing,
  isLoading,
  formData,
  selectedFile,
  categories,
  onClose,
  onSubmit,
  onFormDataChange,
  onFileChange
}: WriteModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {isEditing ? '글 수정' : '새 글 작성'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form onSubmit={onSubmit}>
            {/* 카테고리 선택 */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-4">
                <label className="text-sm font-medium text-gray-700">카테고리:</label>
                <select
                  value={formData.category}
                  onChange={(e) => onFormDataChange({ ...formData, category: e.target.value as BoardCategory })}
                  className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  {categories && Object.entries(categories).map(([key, value]) => (
                    <option key={key} value={key}>{String(value)}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* 제목 입력 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                제목
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => onFormDataChange({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="제목을 입력하세요"
                required
              />
            </div>
            
            {/* 내용 입력 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                내용
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => onFormDataChange({ ...formData, content: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={6}
                placeholder="내용을 입력하세요"
                required
              />
            </div>
            
            {/* 파일 첨부 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                파일 첨부 (선택사항)
              </label>
              <input
                type="file"
                onChange={onFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                accept="image/*"
              />
              {selectedFile && (
                <p className="text-sm text-gray-600 mt-1">
                  선택된 파일: {selectedFile.name}
                </p>
              )}
            </div>
            
            {/* 버튼 */}
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                disabled={isLoading}
              >
                취소
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                disabled={isLoading}
              >
                {isEditing ? '수정' : '작성'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WriteModal;
