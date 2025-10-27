import { BoardSkeletonProps } from '../types/components';

const BoardSkeleton = ({ count = 10 }: BoardSkeletonProps) => {
  return (
    <div className="mt-4 overflow-hidden bg-white rounded-lg shadow-md">
      <div className="divide-y divide-gray-200">
        {Array.from({ length: count }, (_, index) => (
          <div
            key={index}
            className="grid grid-cols-1 gap-2 px-4 py-3 sm:grid-cols-12 sm:gap-4 sm:px-6 sm:py-4 animate-pulse"
          >
            <div className="space-y-2 sm:hidden">
              <div className="flex items-start justify-between">
                <div className="flex-1 h-4 mr-2 bg-gray-200 rounded"></div>
                <div className="w-12 h-6 bg-gray-200 rounded-full"></div>
              </div>
              <div className="flex justify-between">
                <div className="w-8 h-3 bg-gray-200 rounded"></div>
                <div className="w-16 h-3 bg-gray-200 rounded"></div>
                <div className="w-20 h-3 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="hidden sm:col-span-1 sm:flex sm:items-center">
              <div className="w-8 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="hidden sm:col-span-5 sm:flex sm:items-center">
              <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
            </div>
            <div className="hidden sm:col-span-2 sm:flex sm:items-center">
              <div className="w-16 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="hidden sm:col-span-2 sm:flex sm:items-center">
              <div className="w-12 h-6 bg-gray-200 rounded-full"></div>
            </div>
            <div className="hidden sm:col-span-2 sm:flex sm:items-center">
              <div className="w-20 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardSkeleton;
