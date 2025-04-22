import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";

const Forgetpass = () => {
  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const [step, setStep] = useState(1); // 1: email, 2: otp, 3: reset
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    if (!form.email) return toast.error("Please enter your email");

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/auth/reset-password/sendOTP", { email: form.email });
      toast.success(res.data.message || "OTP sent to email");
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitOtp = async (e) => {
    e.preventDefault();
    if (!form.otp) return toast.error("Please enter OTP");

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/auth/reset-password/verify-otp", {
        email: form.email,
        token: form.otp,
      });

      if (res.data.success) {
        toast.success("OTP verified! Now reset your password.");
        setStep(3);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!form.newPassword || !form.otp || !form.email) return toast.error("Missing info");

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/auth/reset-password", {
        token: form.otp,
        newPassword: form.newPassword,
        email: form.email,
      });

      toast.success(res.data.message || "Password reset successfully");
      setStep(1);
      setForm({ email: "", otp: "", newPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      {step === 1 && (
        <form onSubmit={handleSubmitEmail}>
          <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
          <label className="block mb-2 text-sm">Email Address</label>
          <input
            type="email"
            name="email"
            className="w-full p-3 mb-4 bg-gray-100 border rounded"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
          <button className="bg-red-600 w-full text-white py-2 rounded hover:bg-red-700">
            Send Reset Link
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmitOtp}>
          <h2 className="text-xl font-bold mb-4">Verify OTP</h2>
          <label className="block mb-2 text-sm">Enter OTP</label>
          <input
            type="text"
            name="otp"
            className="w-full p-3 mb-4 bg-gray-100 border rounded"
            value={form.otp}
            onChange={handleChange}
            placeholder="Enter OTP from your email"
            required
          />
          <button className="bg-blue-600 w-full text-white py-2 rounded hover:bg-blue-700">
            Verify OTP
          </button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleResetPassword}>
          <h2 className="text-xl font-bold mb-4">Reset Password</h2>
          <label className="block mb-2 text-sm">New Password</label>
          <input
            type="password"
            name="newPassword"
            className="w-full p-3 mb-4 bg-gray-100 border rounded"
            value={form.newPassword}
            onChange={handleChange}
            placeholder="Enter new password"
            required
          />
          <button className="bg-green-600 w-full text-white py-2 rounded hover:bg-green-700">
            Reset Password
          </button>
        </form>
      )}
      {loading && <Loader />}
    </div>
  );
};

export default Forgetpass;
