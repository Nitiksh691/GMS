import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = ({ setShowLoginForm }) => {
  const [formData, setFormData] = useState({
    userName: "", // Changed from username to match backend
    email: "",
    password: "",
    gymName: "",
    profilePic: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profilePic: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = "";

      // Upload image to Cloudinary if exists
      if (formData.profilePic) {
        const data = new FormData();
        data.append("file", formData.profilePic);
        data.append("upload_preset", "gym-management-system");
        data.append("cloud_name", "dr4nfueet");

        const res = await fetch("https://api.cloudinary.com/v1_1/dr4nfueet/image/upload", {
          method: "POST",
          body: data,
        });
        const result = await res.json();
        imageUrl = result.secure_url;
      }

      // Prepare data for backend
      const registrationData = {
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
        gymName: formData.gymName,
        profilePic: imageUrl || "",
      };

      // Send registration data to backend
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        registrationData,
        { withCredentials: true }
      );

      toast.success("Registration successful!");
      console.log("Registration response:", response.data);

      // Optionally switch to login form after successful registration
      setShowLoginForm(true);

    } catch (err) {
      console.error("Registration error:", err);
      const errorMessage = err.response?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
      <form onSubmit={handleSubmit}>
        {/* Username */}
        <div className="mb-6">
          <label className="block text-sm mb-2">Username</label>
          <input
            type="text"
            name="userName" // Changed to match backend
            value={formData.userName}
            onChange={handleChange}
            className="w-full p-3 bg-gray-700 text-white rounded-md"
            placeholder="Enter username"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-sm mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 bg-gray-700 text-white rounded-md"
            placeholder="Enter email"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 bg-gray-700 text-white rounded-md"
            placeholder="Enter password"
            required
          />
        </div>

        {/* Gym Name */}
        <div className="mb-6">
          <label className="block text-sm mb-2">Gym Name</label>
          <input
            type="text"
            name="gymName"
            value={formData.gymName}
            onChange={handleChange}
            className="w-full p-3 bg-gray-700 text-white rounded-md"
            placeholder="Enter gym name"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-sm mb-2">Upload Profile Picture</label>
          <div
            className="border-2 border-dashed border-gray-500 rounded-md p-4 text-center cursor-pointer hover:border-red-600 transition-all"
            onClick={() => document.getElementById("image-upload").click()}
          >
            <p className="text-gray-400">Click or Drag & Drop to upload</p>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          {previewImage && (
            <div className="mt-4 text-center">
              <img
                src={previewImage}
                alt="Preview"
                className="w-28 h-28 object-cover mx-auto rounded-md border-4 border-white shadow-lg"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md w-full disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        <p className="text-center mt-4 text-sm text-white">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => setShowLoginForm(true)}
            className="text-red-500 hover:text-red-700"
          >
            Login here
          </button>
        </p>
      </form>

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

export default Signup;