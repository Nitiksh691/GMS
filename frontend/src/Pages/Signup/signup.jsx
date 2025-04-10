// src/Pages/Signup/Register.jsx
import React, { useState } from "react";

const Signup = ({ setShowLoginForm }) => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

 

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
      <form>
        {/* New Username Field */}
        <div className="mb-6">
          <label className="block text-sm mb-2">Username</label>
          <input
            type="text"
            className="w-full p-3 bg-gray-700 text-white rounded-md"
            placeholder="Enter username"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-2">Email</label>
          <input
            type="email"
            className="w-full p-3 bg-gray-700 text-white rounded-md"
            placeholder="Enter email"
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

        {/* Image Upload Section */}
        <div className="mb-6">
          <label className="block text-sm mb-2">Upload Image</label>
          <div
            className="border-2 border-dashed border-gray-500 rounded-md p-4 text-center cursor-pointer hover:border-red-600 transition-all"
            onClick={() => document.getElementById("image-upload").click()}
          >
            <p className="text-gray-400">Click or Drag & Drop to upload</p>
            <input
              id="image-upload"
              type="file"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          {/* Display uploaded image if exists */}
          {image && (
            <div className="mt-4 text-center">
              <img
                src={image}
                alt="Uploaded"
                className="w-28 h-28 object-cover mx-auto rounded-md border-4 border-white shadow-lg"
              />
            </div>
          )}
        </div>

        <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md w-full">
          Register
        </button>
        <p className="text-center mt-4 text-sm text-white">
          Already have an account?{" "}
          <button
            onClick={() => setShowLoginForm(true)}
            className="text-red-500 hover:text-red-700"
          >
            Login here
          </button>
        </p>
      </form>
    </>
  );
};

export default Signup;
