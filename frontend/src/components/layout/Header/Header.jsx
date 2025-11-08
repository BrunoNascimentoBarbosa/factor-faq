import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { authService } from '@/services/authService';

export const Header = () => {
  const isAuth = authService.isAuthenticated();

  return (
    <header className="bg-primary shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src="/assets/logo.svg"
            alt="Logo"
            className="h-[55px] w-auto"
          />
        </Link>

        {isAuth ? (
          <Link
            to="/admin"
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5 text-primary" />
            <span className="font-medium text-primary">Painel Admin</span>
          </Link>
        ) : (
          <Link
            to="/login"
            className="px-6 py-1.5 bg-[#F2665D] hover:bg-[#e55548] text-white text-sm font-semibold rounded-full transition-colors shadow-sm"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};
