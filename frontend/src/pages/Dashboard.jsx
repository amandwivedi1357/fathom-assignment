import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SearchBar from '../components/SearchBar';
import ShipCard from '../components/ShipCard';
import StatCard from '../components/StatCard';
import { 
  Ship, 
  Anchor, 
  AlertTriangle, 
  Calendar, 
  Loader
} from 'lucide-react';
import { getMockShips } from '../services/shipService';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [ships, setShips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    const fetchShips = async () => {
      try {
        const data = getMockShips();
        setShips(data);
      } catch (err) {
        setError('Failed to fetch ship data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShips();
  }, []);

  const handleSearch = async (query) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const mockShips = getMockShips();
      const results = mockShips.filter(ship => 
        ship.name.toLowerCase().includes(query.toLowerCase()) || 
        ship.imo.includes(query) ||
        ship.type.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults(results);
    } catch (err) {
      setError('Search failed. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchResults(null);
  };

  const displayedShips = searchResults || ships;

  return (
    <div className="container mx-auto">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Maritime Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, {user?.name || 'User'}. Here's the latest maritime information.
          </p>
        </div>
        
      </div>
      
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Active Vessels" 
          value="3,542" 
          icon={<Ship size={20} />} 
          color="marine" 
        />
        <StatCard 
          title="In Port" 
          value="1,264" 
          icon={<Anchor size={20} />} 
          color="blue" 
        />
        <StatCard 
          title="Alerts" 
          value="17" 
          icon={<AlertTriangle size={20} />} 
          color="orange" 
        />
        <StatCard 
          title="Scheduled Arrivals" 
          value="89" 
          icon={<Calendar size={20} />} 
          color="green" 
        />
      </div>
      
      <div className="mb-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <h2 className="text-xl font-semibold text-gray-800">Ship Information</h2>
          <SearchBar onSearch={handleSearch} />
        </div>
        
        {searchResults && (
          <div className="mt-4 flex items-center">
            <span className="mr-2 text-sm text-gray-600">
              Found {searchResults.length} results
            </span>
            <button 
              onClick={handleClearSearch}
              className="text-sm text-marine-medium hover:text-marine-dark"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
      
      {isLoading ? (
        <div className="flex h-40 items-center justify-center">
          <Loader className="h-8 w-8 animate-spin text-marine-medium" />
          <span className="ml-2 text-gray-600">Loading ship data...</span>
        </div>
      ) : error ? (
        <div className="rounded-lg bg-red-50 p-4 text-center text-red-800">
          <AlertTriangle className="mx-auto mb-2 h-6 w-6 text-red-500" />
          <p>{error}</p>
        </div>
      ) : displayedShips.length === 0 ? (
        <div className="rounded-lg bg-gray-50 p-8 text-center">
          <Ship className="mx-auto mb-3 h-10 w-10 text-gray-400" />
          <h3 className="mb-1 text-lg font-medium text-gray-900">No ships found</h3>
          <p className="text-gray-500">Try a different search term or check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayedShips.map((ship) => (
            <ShipCard key={ship.id} ship={ship} />
          ))}
        </div>
      )}
      
    </div>
  );
};

export default Dashboard;