import { Link, useLocation } from 'react-router-dom';
import { Anchor, BarChart2, Ship, Search, User, Settings, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = ({ onClose }) => {
  const location = useLocation();
  const { user } = useAuth();
  console.log(user)

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', name: 'Dashboard', icon: <BarChart2 size={20} /> },
    { path: '/search', name: 'Search Ships', icon: <Search size={20} /> },
    { path: '/profile', name: 'Profile', icon: <User size={20} /> },
    { path: '/settings', name: 'Settings', icon: <Settings size={20} /> }
  ];

  return (
    <div className="flex h-full flex-col bg-[var(--marine-medium)] text-white">
      <div className="flex items-center justify-between px-4 py-6">
        <Link to="/" className="flex items-center">
          <Anchor size={28} className="text-marine-pale" />
          <span className="ml-2 text-xl font-bold">Maritime Ops</span>
        </Link>
        <button onClick={onClose} className="rounded-md p-1 lg:hidden">
          <X size={24} />
        </button>
      </div>
      
      <div className="mb-8 px-4">
        <div className="flex items-center space-x-3 rounded-md bg-marine-medium/30 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-marine-light text-marine-dark">
            <span className="font-bold">{user?.name?.[0] || 'U'}</span>
          </div>
          <div>
            <div className="text-sm font-medium">{user?.name || 'User'}</div>
            <div className="text-xs text-gray-300">{user?.email || 'user@example.com'}</div>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1 px-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center rounded-md px-3 py-2 text-sm ${
              isActive(item.path) 
                ? 'bg-marine-medium text-white' 
                : 'text-gray-300 hover:bg-marine-medium/50 hover:text-white'
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
      
      <div className="mt-auto p-4">
        <div className="animate-wave rounded-md bg-gradient-to-r from-marine-medium to-marine-light p-3 text-center text-sm">
          <Ship className="mx-auto mb-1" size={20} />
          <span className="block">Maritime Operations</span>
          <span className="block text-xs opacity-80">v1.0.0</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;