import axios from 'axios';
import { API_URL } from '../config';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const getShips = async () => {
  try {
    const response = await axios.get(`${API_URL}/ships`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error fetching ships:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch ships');
  }
};

export const searchShips = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/ships/search`, {
      params: { query },
      ...getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error searching ships:', error);
    throw new Error(error.response?.data?.message || 'Failed to search ships');
  }
};

export const getShipDetails = async (shipId) => {
  try {
    const response = await axios.get(`${API_URL}/ships/${shipId}`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error fetching ship details:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch ship details');
  }
};

export const getRecentShips = async () => {
  try {
    const response = await axios.get(`${API_URL}/ships/recent`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error fetching recent ships:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch recent ships');
  }
};

