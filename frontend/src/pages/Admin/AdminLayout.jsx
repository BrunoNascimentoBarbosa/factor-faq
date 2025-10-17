import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FileText, LogOut, Home } from 'lucide-react';
import { authService } from '@/services/authService';

export const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link to="/admin" className="flex items-center">
                <img
                  src="/assets/logo.png"
                  alt="Logo"
                  className="h-8 w-auto"
                />
              </Link>

              <nav className="hidden md:flex items-center gap-4 ml-8">
                <Link
                  to="/admin"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${
                    isActive('/admin')
                      ? 'bg-white text-primary'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  <Home className="w-5 h-5" />
                  Dashboard
                </Link>
                <Link
                  to="/admin/faqs"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${
                    isActive('/admin/faqs')
                      ? 'bg-white text-primary'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  FAQs
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="text-sm text-white hover:text-white/80 font-medium"
              >
                Ver site
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-white text-primary hover:bg-gray-100 rounded-lg transition-colors font-medium"
              >
                <LogOut className="w-5 h-5" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};
