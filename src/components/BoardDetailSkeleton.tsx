const BoardDetailSkeleton = () => {
  return (
    <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-64 h-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-20 h-6 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
        <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
      <div className="flex-1">
        <div className="mb-4">
          <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="mb-4 space-y-2">
          <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default BoardDetailSkeleton;
