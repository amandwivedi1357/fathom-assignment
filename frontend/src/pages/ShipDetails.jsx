import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Ship, 
  Anchor, 
  Flag, 
  Calendar, 
  Scale, 
  MapPin, 
  Building, 
  User, 
  FileText, 
  Ruler, 
  Activity,
  ArrowLeft,
  Loader,
  AlertTriangle
} from 'lucide-react';
import { getShipDetails } from '../services/shipService';

const ShipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ship, setShip] = useState(null);
  const [activeTab, setActiveTab] = useState('details');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShipDetails = async () => {
      try {
       
        const data = getShipDetails(id);
        setShip(data);
      } catch (err) {
        setError('Failed to fetch ship details');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShipDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-marine-medium" />
        <span className="ml-2 text-gray-600">Loading ship details...</span>
      </div>
    );
  }

  if (error || !ship) {
    return (
      <div className="rounded-lg bg-red-50 p-6 text-center">
        <AlertTriangle className="mx-auto mb-3 h-8 w-8 text-red-500" />
        <h3 className="mb-2 text-lg font-medium text-red-800">Error Loading Ship Details</h3>
        <p className="text-red-700">{error || 'Ship not found'}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 inline-flex items-center rounded-md bg-marine-medium px-4 py-2 text-sm font-medium text-white hover:bg-marine-dark"
        >
          <ArrowLeft size={16} className="mr-2" />
          Go Back
        </button>
      </div>
    );
  }

  const tabs = [
    { id: 'details', label: 'Details' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'voyages', label: 'Voyage History' },
  ];

  return (
    <div className="container mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center text-sm font-medium text-marine-medium hover:text-marine-dark"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Dashboard
      </button>
      
      <div className="mb-8 rounded-lg bg-gradient-to-r from-[#4567b7] to-[#5a7fc3] p-6 text-white">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center">
            <Ship size={40} className="mr-4 text-marine-pale" />
            <div>
              <h1 className="text-2xl font-bold md:text-3xl">{ship.name}</h1>
              <p className="text-marine-pale">IMO: {ship.imo} • {ship.type}</p>
            </div>
          </div>
          <div className="flex items-center rounded-full bg-white/10 px-4 py-2">
            <span className="mr-2 h-2 w-2 rounded-full bg-green-400"></span>
            <span className="font-medium text-white">{ship.status}</span>
          </div>
        </div>
      </div>
      
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 text-sm font-medium ${
                activeTab === tab.id
                  ? 'border-b-2 border-marine-medium text-marine-medium'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="mb-12">
        {activeTab === 'details' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="col-span-2 space-y-6">
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-4 text-lg font-semibold text-gray-800">Vessel Information</h2>
                <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2">
                  <div className="flex items-center">
                    <Ship size={18} className="mr-3 text-marine-medium" />
                    <div>
                      <p className="text-xs text-gray-500">Vessel Type</p>
                      <p className="font-medium">{ship.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Flag size={18} className="mr-3 text-marine-medium" />
                    <div>
                      <p className="text-xs text-gray-500">Flag</p>
                      <p className="font-medium">{ship.flag}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={18} className="mr-3 text-marine-medium" />
                    <div>
                      <p className="text-xs text-gray-500">Year Built</p>
                      <p className="font-medium">{ship.yearBuilt}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Scale size={18} className="mr-3 text-marine-medium" />
                    <div>
                      <p className="text-xs text-gray-500">Gross Tonnage</p>
                      <p className="font-medium">{ship.grossTonnage.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-4 text-lg font-semibold text-gray-800">Ownership & Management</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Building size={18} className="mr-3 text-marine-medium" />
                    <div>
                      <p className="text-xs text-gray-500">Owner</p>
                      <p className="font-medium">{ship.owner}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <User size={18} className="mr-3 text-marine-medium" />
                    <div>
                      <p className="text-xs text-gray-500">Manager</p>
                      <p className="font-medium">{ship.manager}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FileText size={18} className="mr-3 text-marine-medium" />
                    <div>
                      <p className="text-xs text-gray-500">Classification</p>
                      <p className="font-medium">{ship.classification}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-4 text-lg font-semibold text-gray-800">Technical Specifications</h2>
                <div className="space-y-4">
                  <div>
                    <p className="mb-1 text-sm font-medium text-gray-700">Dimensions</p>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Length</p>
                        <p className="font-medium">{ship.dimensions.length} m</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Beam</p>
                        <p className="font-medium">{ship.dimensions.beam} m</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Draft</p>
                        <p className="font-medium">{ship.dimensions.draft} m</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-medium text-gray-700">Engine</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Type</p>
                        <p className="font-medium">{ship.engine.type}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Power</p>
                        <p className="font-medium">{ship.engine.power}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-4 text-lg font-semibold text-gray-800">Current Position</h2>
                <div className="mb-4 h-48 rounded bg-gray-200 flex items-center justify-center">
                  <MapPin size={24} className="text-marine-medium" />
                  <span className="ml-2 text-sm text-gray-600">Map Placeholder</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Last Updated:</span>
                  <span className="font-medium">
                    {new Date(ship.location.lastUpdated).toLocaleString()}
                  </span>
                </div>
              </div>
              
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-4 text-lg font-semibold text-gray-800">Status & Activity</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Current Status</span>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                      {ship.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Last Port</span>
                    <span className="font-medium">Tokyo, Japan</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Next Port</span>
                    <span className="font-medium">Shanghai, China</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">ETA</span>
                    <span className="font-medium">May 22, 2023</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'certificates' && (
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-6 text-lg font-semibold text-gray-800">Ship Certificates</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Certificate Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Issuing Authority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Issue Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Expiry Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {ship.certificates.map((cert, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{cert.type}</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-500">Lloyd's Register</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-500">2022-06-30</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-500">{cert.expiry}</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                          Valid
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'voyages' && (
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-6 text-lg font-semibold text-gray-800">Voyage History</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Voyage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Departure
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Arrival
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {ship.voyageHistory.map((voyage, index) => {
                    const departureDate = new Date(voyage.departure);
                    const arrivalDate = new Date(voyage.arrival);
                    const durationDays = Math.round((arrivalDate - departureDate) / (1000 * 60 * 60 * 24));
                    
                    return (
                      <tr key={index}>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {voyage.from} → {voyage.to}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-500">{voyage.departure}</div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-500">{voyage.arrival}</div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-500">{durationDays} days</div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <span className="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800">
                            Completed
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      
     
    </div>
  );
};

export default ShipDetails;