import axios from 'axios';
import baseURL from '../baseUrl';

const ADMIN_API = axios.create({
  baseURL: baseURL, // backend URL for admin routes
});

// confirm the user is admin by checking the token
ADMIN_API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// pilot apis
export const getAllUsers = () => ADMIN_API.get('admin/users');
export const deleteUser = (userId) => ADMIN_API.delete(`admin/users/${userId}`);
export const getUserById = (userId) => ADMIN_API.get(`admin/users/${userId}`);
//get all pilots
export const getAllPilots = () => ADMIN_API.get('admin/pilots');

//get not verified pilots
export const getNotVerifiedPilots = () => ADMIN_API.get('/pilots/not-verified');

//verify pilot
export const verifyPilot = (pilotId) => ADMIN_API.put(`admin/pilots/verify/${pilotId}`);

// on bench
export const getOnBenchPilots = () => ADMIN_API.get('/pilots/on-bench');

// get by ID
export const getPilotById = (pilotId) => ADMIN_API.get(`admin/pilots/${pilotId}`);

// switch bench status
export const switchBenchStatus = (pilotId) => ADMIN_API.put(`/pilots/accept/${pilotId}`);

export const addLocation = (locationData) => ADMIN_API.post('admin/locations', locationData);

export const getAllLocations = () => ADMIN_API.get('admin/locations');
export default ADMIN_API;