import axios from "axios";

const environment = process.env.NODE_ENV;

const URLMAPPING = {
  development: "https://localhost:3000",
  production: "https://testandtutor.com:3001",
};

// // baseURL: "http://157.230.214.200:3001",
// baseURL: "https://localhost:3000",
// // baseURL: "https://testandtutor.com:3001",
// // baseURL: "https://ec2-18-133-161-49.eu-west-2.compute.amazonaws.com:3000"
const instance = axios.create({
  baseURL: URLMAPPING[environment],
  withCredentials: true,
});

instance.defaults.headers.common["Authorization"] = "AUTH TOKEN FROM INSTANCE";

export default instance;
