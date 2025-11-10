import axios from "axios";
import { refreshAccessToken } from "./refreshAccessToken";
const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
, // আপনার API এর বেস URL
});

// Token Refresh করার সময় ট্র্যাক রাখার জন্য ফ্ল্যাগ
let isRefreshing = false;
// রিকুয়েস্ট কিউ যা টোকেন রিফ্রেশ হওয়া পর্যন্ত অপেক্ষা করবে
let requestQueue = [];

// Request Interceptor (Header-এ Authorization যোগ করা)
axiosSecure.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("access_token"); // Access Token LocalStorage থেকে পড়া
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);





// Response Interceptor (Error হ্যান্ডল করা)
axiosSecure.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // রিকুয়েস্ট একবারই Retry হবে

            // যদি টোকেন রিফ্রেশ হচ্ছে, তবে কিউতে রেখে অপেক্ষা করুন
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    requestQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        // নতুন টোকেন দিয়ে ব্যর্থ রিকুয়েস্টটি পুনরায় পাঠানো
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return axiosSecure(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            // নতুন টোকেন তৈরি করার প্রক্রিয়া শুরু
            isRefreshing = true;
            const refreshToken = localStorage.getItem("refresh_token");

            try {
                // Refresh Token দিয়ে নতুন Access Token তৈরি করা
                const newAccessToken = await refreshAccessToken(refreshToken)

                // const newAccessToken = response.data.accessToken;
                localStorage.setItem("access_token", newAccessToken);

                // কিউতে থাকা সকল রিকুয়েস্ট প্রসেস করা
                requestQueue.forEach((req) => req.resolve(newAccessToken));
                requestQueue = [];
                isRefreshing = false;

                // নতুন টোকেন দিয়ে ব্যর্থ রিকুয়েস্টটি পুনরায় চেষ্টা
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosSecure(originalRequest);
            } catch (refreshError) {
                console.error("Token Refresh ব্যর্থ:", refreshError);
                // টোকেন মুছে ফেলা এবং Login Page-এ রিডাইরেক্ট করা
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                isRefreshing = false;

                // কিউতে থাকা সকল রিকুয়েস্ট রিজেক্ট করা
                requestQueue.forEach((req) => req.reject(refreshError));
                requestQueue = [];

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosSecure;
