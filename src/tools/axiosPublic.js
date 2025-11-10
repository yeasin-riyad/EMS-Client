import axios from "axios";

const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL, // Set your API base URL
});

export default axiosPublic;
