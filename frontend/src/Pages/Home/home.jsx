import React, { useState } from "react";
import Login from "../Login/login";
import Signup from "../Signup/signup";

const Home = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);

  return (
    <div className="min-h-screen w-full bg-black text-white font-sans">
      {/* Hero Section */}
      <div
        className="bg-cover bg-center h-screen flex flex-col justify-center items-center text-center"
        style={{
          backgroundImage: "url('https://via.placeholder.com/1500x1000?text=Gym+Background')",
        }}
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
          Transform Your Life Today
        </h1>
        <p className="text-lg sm:text-xl mt-4">
          Join the best gym in town. Get fit, get strong!
        </p>
      </div>

      {/* Login/Signup Form Section */}
      <div className="flex justify-center items-center py-10 px-4 bg-black">
        <div className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-lg">
          {showLoginForm ? (
            <Login setShowLoginForm={setShowLoginForm} />
          ) : (
            <Signup setShowLoginForm={setShowLoginForm} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
