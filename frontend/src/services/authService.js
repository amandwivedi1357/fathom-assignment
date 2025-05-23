import axios from 'axios';
import { API_URL } from '../config';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    });
    
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Network error occurred. Please try again.');
    }
  }
};

export const signup = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, {
      name,
      email,
      password
    });
    
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Network error occurred. Please try again.');
    }
  }
};

export const validateToken = async () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('No token found');
  }
  
  try {
    const response = await axios.get(`${API_URL}/auth/validate`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return response.data;
  } catch (error) {
    localStorage.removeItem('token');
    throw new Error('Invalid token');
  }
};