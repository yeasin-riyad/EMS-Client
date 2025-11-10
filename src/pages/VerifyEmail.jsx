import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import axiosPublic from "../tools/axiosPublic";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("pending");
  
  const verificationCode = searchParams.get("code"); // Get the 'code' from URL

  useEffect(() => {
    if (verificationCode) {
      verifyEmail();
    }
  }, [verificationCode]);

  const verifyEmail = async () => {
    try {
      const response = await axiosPublic.post(`user/verify-email?code=${verificationCode}`);
      if (response.data.success) {
        setStatus("success");
      } else {
        setStatus("failed");
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      setStatus("failed");
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          {status === "pending" && "Verifying Email..."}
          {status === "success" && "Email Verified Successfully 🎉"}
          {status === "failed" && "Verification Failed ❌"}
        </h2>

        {status === "success" && (
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Your email has been successfully verified. You can now log in.
          </p>
        )}

        {status === "failed" && (
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            The verification code is invalid or expired. Please try again.
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
