import axios from 'axios';
import { API_URL } from '../config';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`
  };
};

export const searchShips = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/ships/search`, {
      params: { query },
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error searching ships:', error);
    throw new Error(error.response?.data?.message || 'Failed to search ships');
  }
};

export const getShipDetails = async (shipId) => {
  try {
    const response = await axios.get(`${API_URL}/ships/${shipId}`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching ship details:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch ship details');
  }
};

export const getRecentShips = async () => {
  try {
    const response = await axios.get(`${API_URL}/ships/recent`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recent ships:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch recent ships');
  }
};

// Mock data for frontend development
export const getMockShips = () => {
  return [
    {
      id: '1',
      name: 'Pacific Voyager',
      imo: '9876543',
      type: 'Container Ship',
      flag: 'Panama',
      yearBuilt: 2015,
      grossTonnage: 85600,
      status: 'Active',
      location: { lat: 35.6895, lng: 139.6917, lastUpdated: '2023-05-15T08:30:00Z' }
    },
    {
      id: '2',
      name: 'Atlantic Explorer',
      imo: '9871234',
      type: 'Bulk Carrier',
      flag: 'Liberia',
      yearBuilt: 2018,
      grossTonnage: 63200,
      status: 'Active',
      location: { lat: 40.7128, lng: -74.0060, lastUpdated: '2023-05-14T16:45:00Z' }
    },
    {
      id: '3',
      name: 'Nordic Spirit',
      imo: '9645789',
      type: 'Tanker',
      flag: 'Norway',
      yearBuilt: 2016,
      grossTonnage: 72400,
      status: 'In Port',
      location: { lat: 51.5074, lng: -0.1278, lastUpdated: '2023-05-15T11:20:00Z' }
    },
    {
      id: '4',
      name: 'Mediterranean Queen',
      imo: '9812345',
      type: 'Cruise Ship',
      flag: 'Italy',
      yearBuilt: 2019,
      grossTonnage: 135800,
      status: 'Active',
      location: { lat: 41.9028, lng: 12.4964, lastUpdated: '2023-05-15T09:10:00Z' }
    }
  ];
};

export const getMockShipDetails = (shipId) => {
  const ships = getMockShips();
  const ship = ships.find(s => s.id === shipId);
  
  if (!ship) {
    throw new Error('Ship not found');
  }
  
  // Add additional details for the mock ship
  return {
    ...ship,
    owner: 'Ocean Transport Ltd.',
    manager: 'Global Maritime Management',
    classification: 'Lloyd\'s Register',
    dimensions: {
      length: 299.8,
      beam: 48.2,
      draft: 14.5
    },
    engine: {
      type: 'MAN B&W 11G90ME-C10',
      power: '55,000 kW'
    },
    certificates: [
      { type: 'Safety Management Certificate', expiry: '2024-06-30' },
      { type: 'International Ship Security Certificate', expiry: '2025-03-15' },
      { type: 'International Oil Pollution Prevention Certificate', expiry: '2024-11-22' }
    ],
    voyageHistory: [
      { from: 'Singapore', to: 'Shanghai', departure: '2023-04-10', arrival: '2023-04-15' },
      { from: 'Shanghai', to: 'Busan', departure: '2023-04-18', arrival: '2023-04-20' },
      { from: 'Busan', to: 'Tokyo', departure: '2023-04-23', arrival: '2023-04-25' }
    ]
  };
};