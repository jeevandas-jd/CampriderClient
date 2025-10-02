import axios from 'axios';

const ADMIN_API = axios.create({
  baseURL: 'http://localhost:5000/api/admin', // backend URL for admin routes
});

// confirm the user is admin by checking the token
ADMIN_API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// pilot apis

//get all pilots
export const getAllPilots = () => ADMIN_API.get('/pilots');

//get not verified pilots
export const getNotVerifiedPilots = () => ADMIN_API.get('/pilots/not-verified');

//verify pilot
export const verifyPilot = (pilotId) => ADMIN_API.put(`/pilots/verify/${pilotId}`);

// on bench
export const getOnBenchPilots = () => ADMIN_API.get('/pilots/on-bench');

// get by ID
export const getPilotById = (pilotId) => ADMIN_API.get(`/pilots/${pilotId}`);

// switch bench status
export const switchBenchStatus = (pilotId) => ADMIN_API.put(`/pilots/accept/${pilotId}`,data);
export default ADMIN_API;