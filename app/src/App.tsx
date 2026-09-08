import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import './index.css';
import WhatsAppButton from './components/WhatsAppButton';
import EventPopup from './components/EventPopup';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy loaded pages
const InstitutePage = React.lazy(() => import('./pages/InstitutePage'));
const PlanoAbertoPage = React.lazy(() => import('./pages/PlanoAbertoPage'));
const FitiPage = React.lazy(() => import('./pages/FitiPage'));
const DonationPage = React.lazy(() => import('./pages/DonationPage'));
const PrivacyPolicyPage = React.lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsOfUsePage = React.lazy(() => import('./pages/TermsOfUsePage'));
const AdminLayout = React.lazy(() => import('./layouts/AdminLayout'));
const LeadsListPage = React.lazy(() => import('./pages/admin/LeadsListPage'));
const LeadDetailPage = React.lazy(() => import('./pages/admin/LeadDetailPage'));
const PipelinesPage = React.lazy(() => import('./pages/admin/PipelinesPage'));
const TasksPage = React.lazy(() => import('./pages/admin/TasksPage'));
const ReportsPage = React.lazy(() => import('./pages/admin/ReportsPage'));
const SettingsPage = React.lazy(() => import('./pages/admin/SettingsPage'));
const BookingsAdminPage = React.lazy(() => import('./pages/admin/BookingsAdminPage'));
const LoginPage = React.lazy(() => import('./pages/admin/LoginPage'));

// Loading Fallback
const PageLoader = () => (
  <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Website - Instituto como página principal */}
            <Route path="/" element={<InstitutePage />} />
            <Route path="/plano-aberto" element={<PlanoAbertoPage />} />
            <Route path="/fiti" element={<FitiPage />} />
            <Route path="/doar" element={<DonationPage />} />
            <Route path="/instituto" element={<InstitutePage />} />
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
        </Suspense>

        <WhatsAppButton />
        <EventPopup />
        <SpeedInsights />
      </Router>
    </AuthProvider>
  );
}

export default App;
