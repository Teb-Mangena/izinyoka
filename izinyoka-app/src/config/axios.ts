import axios from "axios";

const appUrl = "";

export const axiosInstance = axios.create({
  baseURL: appUrl,
  withCredentials: true
});