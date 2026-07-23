import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import ThreeDBackground from './ThreeDBackground';
import {
  LayoutDashboard, Users, Star, AlertCircle,
  Building2, BookOpen, LogOut, Menu, X, Home, UserCircle, FileText, MessageCircle,
  MessageSquare,
} from 'lucide-react';
import { useState } from 'react';

const NAV = {
  tenant: [
    { to: '/dashboard/tenant', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/dashboard/tenant/profile', label: 'My Profile', icon: UserCircle },
    { to: '/dashboard/tenant/pg', label: 'PG / Hostel', icon: Building2 },
    { to: '/dashboard/tenant/messages', label: 'Chat with Owners', icon: MessageCircle },
    { to: '/post-requirement', label: 'Post Requirement', icon: FileText },
    { to: '/dashboard/tenant/room-partner', label: 'Room Partner', icon: Users },
    { to: '/dashboard/tenant/reviews', label: 'Reviews', icon: Star },
    { to: '/dashboard/tenant/complaints', label: 'Complaints', icon: AlertCircle },
    { to: '/dashboard/tenant/feedback', label: 'Feedback', icon: MessageSquare },
  ],
  owner: [
    { to: '/dashboard/owner', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/dashboard/owner/profile', label: 'My Profile', icon: UserCircle },
    { to: '/dashboard/owner/listings', label: 'My Listings', icon: Home },
    { to: '/dashboard/owner/reviews', label: 'Reviews', icon: Star },
    { to: '/dashboard/owner/messages', label: 'Chat with Tenants', icon: MessageCircle },
    { to: '/dashboard/owner/bookings', label: 'Bookings', icon: BookOpen },
    { to: '/dashboard/owner/feedback', label: 'Feedback', icon: MessageSquare },
  ],
  admin: [
    { to: '/dashboard/admin', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/dashboard/admin/users', label: 'Users', icon: Users },
    { to: '/dashboard/admin/listings', label: 'All Listings', icon: Home },
    { to: '/dashboard/admin/requirements', label: 'Requirements', icon: FileText },
    { to: '/dashboard/admin/bookings', label: 'Bookings', icon: BookOpen },
    { to: '/dashboard/admin/complaints', label: 'Complaints', icon: AlertCircle },
    { to: '/dashboard/admin/feedback', label: 'Feedback', icon: MessageSquare },
    { to: '/dashboard/admin/transactions', label: 'Revenue', icon: BookOpen },
    { to: '/dashboard/admin/profile', label: 'My Profile', icon: UserCircle },
  ],
};

function isNavActive(pathname, to, end) {
  if (end) return pathname === to;
  return pathname === to || pathname.startsWith(`${to}/`);
}

export default function DashboardLayout({ role, title, children }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = NAV[role] || [];

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ThreeDBackground variant="dashboard" />
      <div className="relative z-10 flex">
        <motion.aside
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 18 }}
          className={`fixed inset-y-0 left-0 z-50 w-64 transform transition lg:static lg:translate-x-0 ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex h-full flex-col border-r border-white/60 bg-white/90 p-4 shadow-xl backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link to="/" className="text-lg font-bold">
                  Room<span className="text-brand-500">Hai Kya</span>
                </Link>
              </motion.div>
              <button type="button" className="lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={20} /></button>
            </div>

            <motion.div
              whileHover={{ scale: 1.02, rotate: 0.5 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 p-4 text-white shadow-lg"
            >
              <motion.p
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="text-sm capitalize"
              >
                {user?.role} dashboard
              </motion.p>
              <p className="font-bold truncate">{user?.name}</p>
            </motion.div>

            <nav className="flex-1 space-y-1 overflow-y-auto overscroll-contain">
              {links.map(({ to, label, icon: Icon, end }, i) => {
                const active = isNavActive(location.pathname, to, end);
                return (
                  <motion.div
                    key={to}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      to={to}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                        active
                          ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30'
                          : 'text-gray-600 hover:bg-brand-50 hover:text-brand-700'
                      }`}
                    >
                      <Icon size={18} />
                      {label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-4 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </motion.aside>

        <div className="flex min-h-screen flex-1 flex-col lg:ml-0">
          <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-white/60 bg-white/80 px-4 py-3 backdrop-blur-xl lg:px-8">
            <button type="button" className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <Menu size={22} />
            </button>
            <h1 className="text-lg font-bold text-gray-900 sm:text-xl">{title}</h1>
          </header>
          <div className="flex-1 p-4 sm:p-6 lg:p-8">{children}</div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Close overlay"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
