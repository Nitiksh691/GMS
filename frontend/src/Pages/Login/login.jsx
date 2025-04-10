import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../modal/modal"; // Assuming you want to use a modal for the "Forgot Password" functionality.
import Forgetpass from "../ForgetPass/Forgetpass";

const Login = ({ setShowLoginForm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // To toggle the modal for "Forgot Password"
  const navigate = useNavigate();

  // Function to open the "Forgot Password" modal
  const handleForgotPasswordClick = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = () => {
    
    sessionStorage.setItem('isLogin', true);
    navigate('/dashboard');
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form>
        <div className="mb-6">
          <label className="block text-sm mb-2">Username</label>
          <input
            type="text"
            className="w-full p-3 bg-gray-700 text-white rounded-md"
            placeholder="Enter username"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm mb-2">Password</label>
          <input
            type="password"
            className="w-full p-3 bg-gray-700 text-white rounded-md"
            placeholder="Enter password"
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            type="button"
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
            onClick={()=>{handleLogin()}}
          >
            Submit
          </button>
          <a
            href="#!"
            className="text-sm text-red-500 cursor-pointer"
            onClick={handleForgotPasswordClick}
          >
            Forgot Password?
          </a>
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

      {/* Modal for "Forgot Password" */}
      {isModalOpen && (
        <Modal closeModal={closeModal} content={<Forgetpass />} />
      )}
    </>
  );
};

export default Login;
