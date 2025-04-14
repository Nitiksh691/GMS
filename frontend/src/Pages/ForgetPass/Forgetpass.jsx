import React, { useState } from "react";

const Forgetpass = () => {
  const [form, setForm] = useState({
    email: "",
    otp: "",
  });
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1); // 1: email, 2: otp, 3: reset password

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();

    if (form.email) {
      setMessage("A password reset link has been sent to your email.");
      setStep(2);
    } else {
      setMessage("Please enter a valid email address.");
    }
  };

  const handleSubmitOtp = (e) => {
    e.preventDefault();

    if (form.otp) {
      setMessage("OTP verified successfully. You can now reset your password.");
      setStep(3);
    } else {
      setMessage("Please enter a valid OTP.");
    }
  };

  return (
    <div>
      {step === 1 && (
        <form onSubmit={handleSubmitEmail}>
          <div className="mb-4">
            <label className="block text-sm mb-2 text-gray-800">Enter your email</label>
            <input
              type="email"
              name="email"
              className="w-full p-3 bg-gray-200 text-black rounded-md"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
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
      )}

      {step === 2 && (
        <form onSubmit={handleSubmitOtp}>
          <div className="mb-4">
            <label className="block text-sm mb-2 text-gray-800">Enter OTP</label>
            <input
              type="text"
              name="otp"
              className="w-full p-3 bg-gray-200 text-black rounded-md"
              placeholder="Enter OTP"
              value={form.otp}
              onChange={handleChange}
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

      {step === 3 && (
        <div className="text-center mt-4 text-green-600 font-medium">
          ✅ OTP verified! You can now reset your password.
          {/* You can add a reset password form here if needed */}
        </div>
      )}

      {message && (
        <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
      )}
    </div>
  );
};

export default Forgetpass;
