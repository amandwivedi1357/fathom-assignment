import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from './Sidebar';
import { Menu, X } from 'lucide-react';

const Layout = ({ children }) => {
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
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-[var(--marine-darker)]/70 transition-opacity lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

        {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-[var(--marine-darker)] transition duration-300 ease-in-out lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar onClose={toggleSidebar} />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="bg-[var(--marine-lighter)] shadow-lg">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <button
                  type="button"
                  className="text-[var(--white)]/80 hover:text-[var(--white)] focus:outline-none lg:hidden"
                  onClick={toggleSidebar}
                >
                  <Menu size={24} />
                </button>
                <h1 className="ml-2 text-xl font-semibold text-[var(--white)] lg:ml-0">
                  Maritime Operations
                </h1>
              </div>
              <div className="flex items-center">
                <div className="mr-4 hidden md:flex">
                  <span className="text-sm text-[var(--white)]/80">Welcome, {user?.name || 'User'}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="rounded-md bg-[var(--marine-medium)] text-white px-3 py-2 text-sm font-medium hover:bg-[var(--marine-darker)]"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;