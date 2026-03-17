import axios from "axios";
import { clientENV } from "./clientEnv";

export const axiosInstance = axios.create({
  baseURL: clientENV.appUrl,
  withCredentials: true
})