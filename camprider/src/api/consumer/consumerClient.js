import baseURL from "../baseUrl";

import axios from "axios";
const CONSUMER_API = axios.create({
  baseURL: `${baseURL}/consumer`, // backend URL for consumer routes
});
