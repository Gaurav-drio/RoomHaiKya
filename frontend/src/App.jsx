import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import InfoTicker from './components/InfoTicker';
import SlideTopPanel from './components/SlideTopPanel';
import FloatingSiteButton from './components/FloatingSiteButton';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import RoomsPage from './pages/RoomsPage';
import RoomDetailPage from './pages/RoomDetailPage';
import PostRoomPage from './pages/PostRoomPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import PostRequirementPage from './pages/PostRequirementPage';
import HelpPage from './pages/HelpPage';
import ContactPage from './pages/ContactPage';
import ProfilePage from './pages/dashboard/ProfilePage';

import TenantOverview from './pages/dashboard/tenant/TenantOverview';
import TenantPGPage from './pages/dashboard/tenant/TenantPGPage';
import TenantRoomPartnerPage from './pages/dashboard/tenant/TenantRoomPartnerPage';
import TenantReviewsPage from './pages/dashboard/tenant/TenantReviewsPage';
import TenantComplaintsPage from './pages/dashboard/tenant/TenantComplaintsPage';
import TenantMessagesPage from './pages/dashboard/tenant/TenantMessagesPage';
import FeedbackPage from './pages/dashboard/FeedbackPage';

import OwnerOverview from './pages/dashboard/owner/OwnerOverview';
import OwnerListingsPage from './pages/dashboard/owner/OwnerListingsPage';
import OwnerReviewsPage from './pages/dashboard/owner/OwnerReviewsPage';
import OwnerBookingsPage from './pages/dashboard/owner/OwnerBookingsPage';
import OwnerMessagesPage from './pages/dashboard/owner/OwnerMessagesPage';

import AdminOverview from './pages/dashboard/admin/AdminOverview';
import AdminUsersPage from './pages/dashboard/admin/AdminUsersPage';
import AdminComplaintsPage from './pages/dashboard/admin/AdminComplaintsPage';
import AdminTransactionsPage from './pages/dashboard/admin/AdminTransactionsPage';
import AdminRequirementsPage from './pages/dashboard/admin/AdminRequirementsPage';
import AdminBookingsPage from './pages/dashboard/admin/AdminBookingsPage';
import AdminListingsPage from './pages/dashboard/admin/AdminListingsPage';
import AdminFeedbackPage from './pages/dashboard/admin/AdminFeedbackPage';

function AppShell() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  const [sitePanelOpen, setSitePanelOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      {!isDashboard && (
        <>
          <InfoTicker />
          <SlideTopPanel open={sitePanelOpen} onClose={() => setSitePanelOpen(false)} />
        </>
      )}
      {!isDashboard && <Header />}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/rooms/:id" element={<RoomDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/post-requirement" element={<PostRequirementPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/post" element={<ProtectedRoute roles={['owner', 'admin']}><PostRoomPage /></ProtectedRoute>} />
          <Route path="/dashboard/owner/listings/:id/edit" element={<ProtectedRoute roles={['owner', 'admin']}><PostRoomPage /></ProtectedRoute>} />

          <Route path="/dashboard/tenant/profile" element={<ProtectedRoute roles={['tenant']}><ProfilePage role="tenant" /></ProtectedRoute>} />
          <Route path="/dashboard/owner/profile" element={<ProtectedRoute roles={['owner']}><ProfilePage role="owner" /></ProtectedRoute>} />
          <Route path="/dashboard/admin/profile" element={<ProtectedRoute roles={['admin']}><ProfilePage role="admin" /></ProtectedRoute>} />

          <Route path="/dashboard/tenant" element={<ProtectedRoute roles={['tenant']}><TenantOverview /></ProtectedRoute>} />
          <Route path="/dashboard/tenant/pg" element={<ProtectedRoute roles={['tenant']}><TenantPGPage /></ProtectedRoute>} />
          <Route path="/dashboard/tenant/room-partner" element={<ProtectedRoute roles={['tenant']}><TenantRoomPartnerPage /></ProtectedRoute>} />
          <Route path="/dashboard/tenant/reviews" element={<ProtectedRoute roles={['tenant']}><TenantReviewsPage /></ProtectedRoute>} />
          <Route path="/dashboard/tenant/complaints" element={<ProtectedRoute roles={['tenant']}><TenantComplaintsPage /></ProtectedRoute>} />
          <Route path="/dashboard/tenant/messages" element={<ProtectedRoute roles={['tenant']}><TenantMessagesPage /></ProtectedRoute>} />
          <Route path="/dashboard/tenant/feedback" element={<ProtectedRoute roles={['tenant']}><FeedbackPage role="tenant" /></ProtectedRoute>} />

          <Route path="/dashboard/owner" element={<ProtectedRoute roles={['owner']}><OwnerOverview /></ProtectedRoute>} />
          <Route path="/dashboard/owner/listings" element={<ProtectedRoute roles={['owner']}><OwnerListingsPage /></ProtectedRoute>} />
          <Route path="/dashboard/owner/reviews" element={<ProtectedRoute roles={['owner']}><OwnerReviewsPage /></ProtectedRoute>} />
          <Route path="/dashboard/owner/bookings" element={<ProtectedRoute roles={['owner']}><OwnerBookingsPage /></ProtectedRoute>} />
          <Route path="/dashboard/owner/messages" element={<ProtectedRoute roles={['owner']}><OwnerMessagesPage /></ProtectedRoute>} />
          <Route path="/dashboard/owner/feedback" element={<ProtectedRoute roles={['owner']}><FeedbackPage role="owner" /></ProtectedRoute>} />

          <Route path="/dashboard/admin" element={<ProtectedRoute roles={['admin']}><AdminOverview /></ProtectedRoute>} />
          <Route path="/dashboard/admin/users" element={<ProtectedRoute roles={['admin']}><AdminUsersPage /></ProtectedRoute>} />
          <Route path="/dashboard/admin/listings" element={<ProtectedRoute roles={['admin']}><AdminListingsPage /></ProtectedRoute>} />
          <Route path="/dashboard/admin/requirements" element={<ProtectedRoute roles={['admin']}><AdminRequirementsPage /></ProtectedRoute>} />
          <Route path="/dashboard/admin/bookings" element={<ProtectedRoute roles={['admin']}><AdminBookingsPage /></ProtectedRoute>} />
          <Route path="/dashboard/admin/complaints" element={<ProtectedRoute roles={['admin']}><AdminComplaintsPage /></ProtectedRoute>} />
          <Route path="/dashboard/admin/transactions" element={<ProtectedRoute roles={['admin']}><AdminTransactionsPage /></ProtectedRoute>} />
          <Route path="/dashboard/admin/feedback" element={<ProtectedRoute roles={['admin']}><AdminFeedbackPage /></ProtectedRoute>} />
          </Routes>
        </AnimatePresence>
      </main>
      {!isDashboard && <Footer />}
      {!isDashboard && (
        <FloatingSiteButton
          open={sitePanelOpen}
          onClick={() => setSitePanelOpen((v) => !v)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </AuthProvider>
  );
}
