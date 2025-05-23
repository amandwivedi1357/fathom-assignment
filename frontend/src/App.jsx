import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ShipDetails from './pages/ShipDetails';
import SearchShips from './pages/SearchShips';
import Layout from './components/Layout';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="search" element={<SearchShips />} />
        <Route path="ships/:id" element={<ShipDetails />} />
      </Route>
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;