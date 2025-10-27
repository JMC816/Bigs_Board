import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { ProtectedRouteProps } from '../types/components';

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLogin } = useAuthStore();

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
