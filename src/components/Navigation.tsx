import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useAuthStore } from '../stores/authStore';

const Navigation = () => {
  const { user, logout } = useAuth();
  const { isLogin } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-6xl px-4 mx-auto sm:px-6">
        <div className="flex justify-between h-16 sm:h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/bigs.png"
                alt="BIGS Logo"
                className="w-auto h-8 sm:h-12"
              />
            </Link>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            {!isLogin ? (
              <>
                <Link
                  to="/login"
                  className="px-2 py-1 text-xs font-medium text-gray-500 rounded-md sm:px-3 sm:py-2 sm:text-sm hover:text-gray-700"
                >
                  로그인
                </Link>
                <Link
                  to="/signup"
                  className="px-2 py-1 text-xs font-medium text-gray-500 rounded-md sm:px-3 sm:py-2 sm:text-sm hover:text-gray-700"
                >
                  회원가입
                </Link>
              </>
            ) : (
              <>
                {user && (
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="px-2 py-1 text-xs text-gray-600 border rounded-lg sm:text-sm bg-gray-50 sm:px-3 sm:py-2">
                      <div className="font-medium text-gray-800">
                        <span className="text-blue-600">아이디:</span>
                        <span className="hidden sm:inline">
                          {user.username}
                        </span>
                        <span className="sm:hidden">
                          {user.username.length > 8
                            ? user.username.substring(0, 8) + '...'
                            : user.username}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-gray-600">
                        <span className="text-green-600">이름:</span>
                        <span className="hidden sm:inline">
                          {user.name || user.username}
                        </span>
                        <span className="sm:hidden">
                          {user.name
                            ? user.name.length > 6
                              ? user.name.substring(0, 6) + '...'
                              : user.name
                            : user.username.length > 6
                              ? user.username.substring(0, 6) + '...'
                              : user.username}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="px-2 py-1 text-xs font-medium text-gray-500 rounded-md sm:px-3 sm:py-2 sm:text-sm hover:text-gray-700"
                    >
                      로그아웃
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
