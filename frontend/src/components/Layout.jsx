import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from './Sidebar';
import { Menu, X } from 'lucide-react';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 transition-opacity lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 transform overflow-y-auto bg-[var(--marine-darker)] transition duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar onClose={toggleSidebar} />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-600 focus:outline-none lg:hidden"
                  onClick={toggleSidebar}
                >
                  <Menu size={24} />
                </button>
                <h1 className="ml-2 text-xl font-semibold text-gray-900 lg:ml-4">
                  Maritime Operations
                </h1>
              </div>
              
              <div className="flex items-center">
                <button
                  onClick={handleLogout}
                  className="rounded-md bg-[var(--marine-medium)] px-3 py-1.5 text-sm font-medium text-white hover:bg-[var(--marine-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--marine-light)] focus:ring-offset-2"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;