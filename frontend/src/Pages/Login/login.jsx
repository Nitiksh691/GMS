import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../modal/modal";
import Forgetpass from "../ForgetPass/Forgetpass";

const Login = ({ setShowLoginForm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loginFields, setLoginFields] = useState({ username: "", password: "" });
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

  const handleLogin = (e) => {
    e.preventDefault();

    const { username, password } = loginFields;

    // Optional: Add basic validation here
    if (!username || !password) {
      alert("Please fill in both username and password.");
      return;
    }

    sessionStorage.setItem("isLogin", "true");
    navigate("/dashboard");
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-6">
          <label className="block text-sm mb-2">Username</label>
          <input
            type="text"
            name="username"
            className="w-full p-3 bg-gray-700 text-white rounded-md"
            placeholder="Enter username"
            value={loginFields.username}
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

      {/* Forgot Password Modal */}
      {isModalOpen && (
        <Modal closeModal={closeModal} content={<Forgetpass />} />
      )}
    </>
  );
};

export default Login;
