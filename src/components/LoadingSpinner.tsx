import loadingImage from '/loading.png';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <img
        src={loadingImage}
        alt="Loading"
        className="w-16 h-16 animate-spin"
      />
    </div>
  );
};

export default LoadingSpinner;
