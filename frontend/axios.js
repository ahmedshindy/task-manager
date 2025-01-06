import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api", // Update this URL if your Laravel server runs on a different port
});

export default instance;
