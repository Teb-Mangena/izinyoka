import axios from "axios";

const appUrl = process.env.EXPO_PUBLIC_APP_API + "/api";

export const axiosInstance = axios.create({
  baseURL: appUrl,
  withCredentials: true
});