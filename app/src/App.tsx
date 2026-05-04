import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import './index.css';

// Pages
import LandingPage from './pages/LandingPage';
import InstitutePage from './pages/InstitutePage';
import InstituteOldPage from './pages/InstituteOldPage';
import AdminLayout from './layouts/AdminLayout';
import LeadsListPage from './pages/admin/LeadsListPage';
import LeadDetailPage from './pages/admin/LeadDetailPage';
import PipelinesPage from './pages/admin/PipelinesPage';
import TasksPage from './pages/admin/TasksPage';
import ReportsPage from './pages/admin/ReportsPage';
import SettingsPage from './pages/admin/SettingsPage';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/admin/LoginPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Website */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/instituto" element={<InstitutePage />} />
          <Route path="/instituto-old" element={<InstituteOldPage />} />
          
          {/* Admin Login */}
          <Route path="/admin/login" element={<LoginPage />} />

          {/* Admin CRM (Protected) */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<LeadsListPage />} />
            <Route path="leads" element={<LeadsListPage />} />
            <Route path="leads/:id" element={<LeadDetailPage />} />
            <Route path="pipelines" element={<PipelinesPage />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
        <SpeedInsights />
      </Router>
    </AuthProvider>
  );
}

export default App;
