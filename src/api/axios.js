import axios from "axios";

const BASE_URL = "";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
  },
  withCredentials: true,
});
