import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_URL,
});
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
api.interceptors.response.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
export default api;
