import axios from "axios";

const instance = axios.create({
  // baseURL: "http://157.230.214.200:3001",
  baseURL: "https://localhost:3000",
  // baseURL: "https://testandtutor.com:3001",
  // baseURL: "https://ec2-18-133-161-49.eu-west-2.compute.amazonaws.com:3000",
  withCredentials: true,
});

instance.defaults.headers.common["Authorization"] = "AUTH TOKEN FROM INSTANCE";

export default instance;
