import { Ship, Flag, Calendar, Scale, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const ShipCard = ({ ship }) => {
  return (
    <Link 
      to={`/ships/${ship.id}`}
      className="block transform rounded-lg bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-marine-dark">{ship.name}</h3>
        <div className="rounded-full bg-marine-light/20 px-2 py-1 text-xs font-medium text-marine-dark">
          {ship.status}
        </div>
      </div>
      
      <div className="mb-4 space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <Ship size={16} className="mr-2 text-marine-medium" />
          <span>IMO: {ship.imo}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Flag size={16} className="mr-2 text-marine-medium" />
          <span>Flag: {ship.flag}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Calendar size={16} className="mr-2 text-marine-medium" />
          <span>Year Built: {ship.yearBuilt}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Scale size={16} className="mr-2 text-marine-medium" />
          <span>Gross Tonnage: {ship.grossTonnage.toLocaleString()}</span>
        </div>
      </div>
      
      {ship.location && (
        <div className="flex items-center rounded-md bg-gray-50 p-2 text-xs text-gray-500">
          <MapPin size={14} className="mr-1 text-marine-medium" />
          <span>Last position: {new Date(ship.location.lastUpdated).toLocaleDateString()}</span>
        </div>
      )}
    </Link>
  );
};

export default ShipCard;