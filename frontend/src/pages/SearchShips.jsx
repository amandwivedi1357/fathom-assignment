import { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import axios from 'axios';

const statusColors = {
  'Underway': 'bg-green-100 text-green-800',
  'At Anchor': 'bg-yellow-100 text-yellow-800',
  'In Port': 'bg-blue-100 text-blue-800',
  'Not Under Command': 'bg-red-100 text-red-800',
  'Restricted Maneuverability': 'bg-purple-100 text-purple-800',
};

const API_URL =  'http://localhost:5000/api';

const SearchShips = () => {
  const [ships, setShips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    flag: '',
  });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const fetchShips = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      
      if (searchTerm) params.append('search', searchTerm);
      if (filters.type) params.append('type', filters.type);
      if (filters.status) params.append('status', filters.status);
      if (filters.flag) params.append('flag', filters.flag);
      if (sortConfig.key) {
        params.append('sortBy', sortConfig.key);
        params.append('order', sortConfig.direction);
      }
      
      const response = await axios.get(`${API_URL}/ships?${params.toString()}`);
      setShips(response.data);
    } catch (err) {
      console.error('Error fetching ships:', err);
      setError('Failed to load ships. Please try again later.');
      setShips([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchShips();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchTerm, filters, sortConfig]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      type: '',
      status: '',
      flag: '',
    });
    setSortConfig({ key: null, direction: 'asc' });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <ChevronsUpDown className="ml-1 h-4 w-4 inline" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="ml-1 h-4 w-4 inline" /> 
      : <ChevronDown className="ml-1 h-4 w-4 inline" />;
  };

  let sortedShips = [...ships];
  if (sortConfig.key) {
    sortedShips.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  const filteredShips = sortedShips.filter(ship => {
    const matchesSearch = 
      ship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ship.imo.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesFilters = 
      (filters.type === '' || ship.type === filters.type) &&
      (filters.status === '' || ship.status === filters.status) &&
      (filters.flag === '' || ship.flag === filters.flag);
      
    return matchesSearch && matchesFilters;
  });

  const shipTypes = [...new Set(ships.map(ship => ship.type))];
  const shipStatuses = [...new Set(ships.map(ship => ship.status))];
  const shipFlags = [...new Set(ships.map(ship => ship.flag))];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Search Ships</h1>
          <p className="mt-2 text-sm text-gray-700">
            Search and filter through the fleet of ships
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="relative flex-1 max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-marine-medium sm:text-sm sm:leading-6"
              placeholder="Search by name or IMO..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </button>
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Reset
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="rounded-md bg-white p-4 shadow">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  id="type"
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-marine-medium focus:outline-none focus:ring-marine-medium sm:text-sm"
                >
                  <option value="">All Types</option>
                  {shipTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  id="status"
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-marine-medium focus:outline-none focus:ring-marine-medium sm:text-sm"
                >
                  <option value="">All Statuses</option>
                  {shipStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="flag" className="block text-sm font-medium text-gray-700">Flag</label>
                <select
                  id="flag"
                  name="flag"
                  value={filters.flag}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-marine-medium focus:outline-none focus:ring-marine-medium sm:text-sm"
                >
                  <option value="">All Flags</option>
                  {shipFlags.map(flag => (
                    <option key={flag} value={flag}>{flag}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      scope="col" 
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center">
                        Name
                        {getSortIcon('name')}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                      onClick={() => handleSort('imo')}
                    >
                      <div className="flex items-center">
                        IMO
                        {getSortIcon('imo')}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                      onClick={() => handleSort('type')}
                    >
                      <div className="flex items-center">
                        Type
                        {getSortIcon('type')}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                      onClick={() => handleSort('flag')}
                    >
                      <div className="flex items-center">
                        Flag
                        {getSortIcon('flag')}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Destination
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      ETA
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredShips.length > 0 ? (
                    filteredShips.map((ship) => (
                      <tr key={ship.id} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                          {ship.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {ship.imo}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {ship.type}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {ship.flag}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            statusColors[ship.status] || 'bg-gray-100 text-gray-800'
                          }`}>
                            {ship.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {ship.destination}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {new Date(ship.eta).toLocaleDateString()}
                        </td>
                        
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-3 py-4 text-center text-sm text-gray-500">
                        No ships found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchShips;