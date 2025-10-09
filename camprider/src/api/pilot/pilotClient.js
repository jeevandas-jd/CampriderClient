import axios  from "axios";
import baseURL from '../baseUrl';
const PILOT_API = axios.create({
  baseURL: `${baseURL}/pilot`, // backend URL for pilot routes
});


// confirm the user is pilot by checking the token
PILOT_API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// pilot apis
//complete profile
export const completePilotProfile = (pilotData) => PILOT_API.post('/fillPilotInfo', pilotData);
export const updateIamLive=()=>PILOT_API.put('/updatePilotStatus');