import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import Modal from "../modal/modal";
import Forgetpass from "../ForgetPass/Forgetpass";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setShowLoginForm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loginFields, setLoginFields] = useState({ userName: "", password: "" });
  const navigate = useNavigate();

  const handleForgotPasswordClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const { userName, password } = loginFields;
  
    if (!userName || !password) {
      toast.error("Please fill in both username and password.");
      return;
    }
    
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        { userName, password }, 
        { withCredentials: true }
      );
      
      // Handle successful login
      toast.success("Login successful!");
      console.log(response.data); // Log the response for debugging
      
      // Store user data and token
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("gymName",response.data.gymName);
      localStorage.setItem("profilePic",response.data.profilePic)
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      navigate("/dashboard");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
      console.error("Login error:", err);
    }
  };


  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-6">
          <label className="block text-sm mb-2">Username</label>
          <input
            type="text"
            name="userName"  // Changed to match backend
            className="w-full p-3 bg-gray-700 text-white rounded-md"
            placeholder="Enter username"
            value={loginFields.userName}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm mb-2">Password</label>
          <input
            type="password"
            name="password"
            className="w-full p-3 bg-gray-700 text-white rounded-md"
            placeholder="Enter password"
            value={loginFields.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
          >
            Submit
          </button>
          <span
            className="text-sm text-red-500 cursor-pointer"
            onClick={handleForgotPasswordClick}
          >
            Forgot Password?
          </span>
        </div>
      </form>
      <p className="text-center mt-4 text-sm text-white">
        Don't have an account?{" "}
        <button
          onClick={() => setShowLoginForm(false)}
          className="text-red-500 hover:text-red-700"
        >
          Register here
        </button>
      </p>

      {isModalOpen && (
        <Modal closeModal={closeModal} content={<Forgetpass />} />
      )}
      
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
    </>
  );
};

export default Login;