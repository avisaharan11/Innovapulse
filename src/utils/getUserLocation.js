// src/utils/getUserLocation.js
import axios from 'axios';

const getUserLocation = async () => {
  try {
    const response = await axios.get('https://ipinfo.io/json?token=<YOUR_IPINFO_TOKEN>');
    return response.data;
  } catch (error) {
    console.error('Error fetching user location:', error);
    return null;
  }
};

export default getUserLocation;
