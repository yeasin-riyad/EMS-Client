import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosPublic from "../tools/axiosPublic";
import { useEffect } from "react";
import { axiosToastError } from "../tools/axiosToastError";

const VerifyOtp = () => {
  const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error,setError]=useState("")
  const location = useLocation();
  const email = location?.state?.email;
  const navigate = useNavigate();

  useEffect(()=>{
    if (!location.state?.email){
      navigate("/forgot-password");
      return;
    }
  })

  // Handle OTP input change
  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; // Allow only single digit
    const newOtp=[...otpArray]
    newOtp[index] = value; // Update the current input
    setOtpArray(newOtp); //

    // Auto-focus on the next input field
    const nextInput = document.getElementById(`otp${index + 2}`);
    if (value && nextInput) nextInput.focus();
  };

  // Handle OTP submission
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otp = otpArray.join(""); // Combine the OTP inputs into a single string
    if (otp.length !== 6) {
      setError("Please enter a 6-digit OTP.");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosPublic.put("user/verify-otp", { otp, email });
    //   toast.success("OTP verified successfully!");
    console.log(response,"res....")


    if (response?.data?.success) {
      navigate("/password-reset", { state: { email, data: response.data.success } });
    }
    

    } catch (error) {
      axiosToastError(error)
      console.error("Error verifying OTP:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-primary-200 from-50% to-gray-100 to-50% px-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Verify OTP
        </h3>
        <h2 className="mb-2 text-center text-lg text-red-500">{error}</h2>

        <p className="text-gray-600 text-sm mb-6 text-center">
          Enter the 6-digit OTP you received to verify your account.
        </p>
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div className="flex space-x-2 justify-center">
            {otpArray.map((digit, index) => (
              <input
                key={index}
                id={`otp${index + 1}`}
                type="text"
                value={digit}
                onChange={(e) =>{
                    e.preventDefault()
                    handleOtpChange(e.target.value, index)
                }}
                maxLength="1"
                className="w-10 h-10 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            ))}
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 text-white font-semibold rounded-md transition bg-primary-200`}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      
      </div>
      
    </div>
  );
};

export default VerifyOtp;
