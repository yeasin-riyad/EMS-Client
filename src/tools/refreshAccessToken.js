import axiosPublic from "./axiosPublic";

export const refreshAccessToken = async (refreshToken) => {
    try {
        // Refresh Token দিয়ে নতুন Access Token তৈরি করা
        const response = await axiosPublic.post(
            "user/refresh-token", // Endpoint
            {}, // রিকুয়েস্ট বডি খালি
            {
                headers: {
                    Authorization: `Bearer ${refreshToken}`, // Refresh Token হেডারে পাঠানো হচ্ছে
                },
            }
        );

        // নতুন Access Token রিটার্ন করা
        return response?.data?.data?.access_token;
    } catch (error) {
        console.error("Error refreshing token:", error);
        throw error; // সমস্যা থাকলে এগিয়ে যাওয়ার জন্য
    }
};
