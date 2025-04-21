import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (!newPassword) return toast.error("Please enter a new password");

    try {
      setIsSubmitting(true);
      const res = await axios.post("http://localhost:5000/auth/reset-password", {
        token,
        newPassword,
      });

      toast.success(res.data.message || "Password reset successful");
      navigate("/login"); // redirect to login page
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Reset Your Password</h2>
      <form onSubmit={handleReset}>
        <label className="block mb-2 text-sm">New Password</label>
        <input
          type="password"
          className="w-full p-3 mb-4 bg-gray-100 border rounded"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-600 w-full text-white py-2 rounded hover:bg-green-700"
        >
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
