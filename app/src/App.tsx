import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import './index.css';
import WhatsAppButton from './components/WhatsAppButton';
import EventPopup from './components/EventPopup';

// Pages
import LandingPage from './pages/LandingPage';
import InstitutePage from './pages/InstitutePage';
import InstituteOldPage from './pages/InstituteOldPage';
import CoworkingPage from './pages/CoworkingPage';
import AgendaPage from './pages/AgendaPage';
import CoursesLandingPage from './pages/CoursesLandingPage';
import CourseDetailPage from './pages/CourseDetailPage';
import BookingsPage from './pages/BookingsPage';
import MyBookingsPage from './pages/MyBookingsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import AdminLayout from './layouts/AdminLayout';
import LeadsListPage from './pages/admin/LeadsListPage';
import LeadDetailPage from './pages/admin/LeadDetailPage';
import PipelinesPage from './pages/admin/PipelinesPage';
import TasksPage from './pages/admin/TasksPage';
import ReportsPage from './pages/admin/ReportsPage';
import SettingsPage from './pages/admin/SettingsPage';
import BookingsAdminPage from './pages/admin/BookingsAdminPage';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/admin/LoginPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Website */}
          <Route path="/" element={<InstitutePage />} />
          <Route path="/vila-tech-hub" element={<LandingPage />} />
          <Route path="/instituto-old" element={<InstituteOldPage />} />
          <Route path="/coworking" element={<CoworkingPage />} />
          <Route path="/agenda" element={<AgendaPage />} />
          <Route path="/cursos" element={<CoursesLandingPage />} />
          <Route path="/cursos/:id" element={<CourseDetailPage />} />
          <Route path="/reservas" element={<BookingsPage />} />
          <Route path="/reservas/minhas" element={<MyBookingsPage />} />
          <Route path="/politica-de-privacidade" element={<PrivacyPolicyPage />} />
          <Route path="/termos-de-uso" element={<TermsOfUsePage />} />

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
            <Route path="bookings" element={<BookingsAdminPage />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>

        <WhatsAppButton />
        <EventPopup />
        <SpeedInsights />
      </Router>
    </AuthProvider>
  );
}

export default App;
