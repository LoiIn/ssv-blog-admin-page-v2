import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/ssv-blog/api/v1",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  withCredentials: true,
});

export default instance;
