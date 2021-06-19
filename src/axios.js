import axios from "axios";

const instance = axios.create({
  // baseURL: "http://157.230.214.200:3001",
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

instance.defaults.headers.common["Authorization"] = "AUTH TOKEN FROM INSTANCE";

export default instance;
