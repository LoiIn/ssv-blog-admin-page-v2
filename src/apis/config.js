import axios from "axios";

const axiosDefaults = {
  baseURL: "http://localhost:8000/ssv-blog/api/v1",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  withCredentials: true,
};
const instance = axios.create(axiosDefaults);

instance.interceptors.response.use(undefined, (error) => {
  if (error.response.status === 401) localStorage.clear();
});

export default instance;
