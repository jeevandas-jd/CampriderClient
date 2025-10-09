import axios from "axios";

import baseURL from '../baseUrl';
const LOCATION_API = axios.create({
  baseURL: `${baseURL}/locations`, // backend URL for location routes
});

export const getAllLocations = () => LOCATION_API.get('/');
