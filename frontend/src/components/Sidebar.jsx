import { Link, useLocation } from 'react-router-dom';
import { Anchor, BarChart2, Search, X, Ship } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = ({ onClose }) => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', name: 'Dashboard', icon: <BarChart2 size={20} /> },
    { path: '/search', name: 'Search Ships', icon: <Ship size={20} /> },
  ];

  return (
    <div className="flex h-full flex-col bg-[var(--marine-darker)] text-white">
      <div className="flex items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center">
          <Anchor size={28} className="text-[var(--marine-light)]" />
          <span className="ml-2 text-xl font-bold">Maritime Ops</span>
        </Link>
        <button 
          onClick={onClose} 
          className="rounded-md p-1 text-gray-300 hover:bg-[var(--marine-dark)] hover:text-white lg:hidden"
          aria-label="Close sidebar"
        >
          <X size={24} />
        </button>
      </div>
      
      <div className="mb-6 px-6">
        <div className="flex items-center space-x-3 rounded-lg bg-[var(--marine-dark)] p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--marine-light)] text-[var(--marine-darker)]">
            <span className="font-bold">{user?.name?.[0]?.toUpperCase() || 'U'}</span>
          </div>
          <div className="overflow-hidden">
            <div className="truncate font-medium">{user?.name || 'User'}</div>
            <div className="truncate text-xs text-gray-300">{user?.email || 'user@example.com'}</div>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center rounded-md px-4 py-3 text-sm font-medium transition-colors ${
              isActive(item.path)
                ? 'bg-[var(--marine-medium)] text-white'
                : 'text-gray-300 hover:bg-[var(--marine-dark)] hover:text-white'
            }`}
            onClick={onClose}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
      
      <div className="border-t border-[var(--marine-dark)] p-4">
        <div className="text-center text-xs text-gray-400">
          Maritime Ops v1.0.0
        </div>
      </div>
    </div>
  );
};

export default Sidebar;