import React, { useState } from "react";

const Forgetpass = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");  // State for OTP
  const [step, setStep] = useState(1);  // Track the step in the process

  const handleSubmitEmail = (e) => {
    e.preventDefault();

    if (email) {
      setMessage("A password reset link has been sent to your email.");
      setStep(2);  // Move to OTP verification step
    } else {
      setMessage("Please enter a valid email address.");
    }

    setEmail("");  // Clear the email input field
  };

  const handleSubmitOtp = (e) => {
    e.preventDefault();

    if (otp) {
      setMessage("OTP verified successfully. You can now reset your password.");
      // Here you would add functionality for actual password reset.
    } else {
      setMessage("Please enter a valid OTP.");
    }

    setOtp("");  // Clear the OTP input field
  };

  return (
    <div>
      {/* Forgot Password Form */}
      {step === 1 ? (
        <form onSubmit={handleSubmitEmail}>
          <div className="mb-4">
            <label className="block text-sm mb-2 text-gray-800">Enter your email</label>
            <input
              type="email"
              className="w-full p-3 bg-gray-200 text-black rounded-md"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md w-full"
          >
            Send Reset Link
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmitOtp}>
          <div className="mb-4">
            <label className="block text-sm mb-2 text-gray-800">Enter OTP</label>
            <input
              type="text"
              className="w-full p-3 bg-gray-200 text-black rounded-md"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md w-full"
          >
            Verify OTP
          </button>
        </form>
      )}

      {/* Display message after submitting */}
      {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}
    </div>
  );
};

export default Forgetpass;