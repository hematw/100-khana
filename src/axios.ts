import axios, { AxiosError, AxiosResponse } from "axios";

const axiosIns = axios.create({
  baseURL: process.env.VITE_API_URL,
  headers: {
    Authorization: localStorage.getItem("token")
      ? `Bearer ${localStorage.getItem("token")}`
      : undefined,
  },
  withCredentials: true,
});

axiosIns.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status == 401) {
      localStorage.removeItem("token");
    }
    return response;
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  }
);

export default axiosIns;
