import axios from 'axios'
const bearerToken=localStorage.getItem("token")??""
const instance = axios.create({
    baseURL: "http://localhost:7001",
    // baseURL:"https://cargo-management.onrender.com"
    // baseURL:" http://invoiceapi.cyenosure.in",
  });

  // Add an interceptor to the instance
instance.interceptors.request.use(
  config => {
    // Add the Bearer token to the request headers
    config.headers['authorization'] = `Bearer ${localStorage.getItem("token")??""}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

  export default instance