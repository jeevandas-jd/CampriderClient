import axios from "axios";
import baseURL from "./baseUrl";
const API_URL = process.env.REACT_APP_API_URL || `${baseURL}/auth`;

export const registerUser = (data) => axios.post(`${API_URL}/register`, data);
export const loginUser = (data) => axios.post(`${API_URL}/login`, data);
export const forgotPassword = (data) => axios.post(`${API_URL}/forgot-password`, data);
export const resetPassword = (data) => axios.post(`${API_URL}/reset-password`, data);
export const getProfile = (token) =>
  axios.get(`${API_URL}/profile`, { headers: { Authorization: `Bearer ${token}` } });
