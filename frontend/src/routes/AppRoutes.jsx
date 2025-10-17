import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '@/pages/Home/Home';
import { Login } from '@/pages/Login/Login';
import { AdminLayout } from '@/pages/Admin/AdminLayout';
import { Dashboard } from '@/pages/Admin/Dashboard';
import { FAQManagement } from '@/pages/Admin/FAQManagement';
import { FAQForm } from '@/pages/Admin/FAQForm';
import { authService } from '@/services/authService';

const PrivateRoute = ({ children }) => {
  return authService.isAuthenticated() ? children : <Navigate to="/login" />;
};

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="faqs" element={<FAQManagement />} />
          <Route path="faqs/new" element={<FAQForm />} />
          <Route path="faqs/edit/:id" element={<FAQForm />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
