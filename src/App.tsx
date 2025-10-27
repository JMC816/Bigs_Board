import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import BoardPage from './pages/BoardPage';
import { useAuthStore } from './stores/authStore';

function App() {
  const { checkAuthStatus } = useAuth();
  const { isLogin, isLoading } = useAuthStore();

  // 앱 시작시 인증 상태 확인
  useEffect(() => {
    checkAuthStatus();
  }, []);


  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation 고정 */}
        <Navigation />
        <main>
          <Routes>
            {/* 공개 라우트 */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            {/* 로그인한 사용자만 접근 가능 */}
            <Route
              path="/board"
              element={
                <ProtectedRoute >
                  <BoardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/boards/:id"
              element={
                <ProtectedRoute>
                  <BoardPage />
                </ProtectedRoute>
              }
            />
            {/* 로그인 유무에 따른 접근 라우터 */}
            <Route
              path="/"
              element={
                isLogin ? (
                  <Navigate to="/board" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            {/* 그 외 주소로 접근 시 이동할 라우터 */}
            <Route
              path="*"
              element={
                isLogin ? (
                  <Navigate to="/board" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
