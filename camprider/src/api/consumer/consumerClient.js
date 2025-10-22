import baseURL from "../baseUrl";

import axios from "axios";
const CONSUMER_API = axios.create({
  baseURL: `${baseURL}/consumer`, // backend URL for consumer routes
});
CONSUMER_API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export const fillInfo = (consumerData) => CONSUMER_API.post('/fillInfo', consumerData);

export const requestTrip = (tripData) => CONSUMER_API.post('/tripRequest', tripData);

export const getTripInfo = () => CONSUMER_API.get('/getTripDetailsPassenger');