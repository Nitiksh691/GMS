import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Components/Home/home";
import Dashboard from "./Components/Dsashboard/Dashboard";
import Sidebar from "./Pages/Sidebar/sidebar";

function App() {
  const navigate = useNavigate();
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLogin");
    setLogin(isLoggedIn === "true");
    navigate(isLoggedIn === "true" ? "/dashboard" : "/");
  }, []);

  return (
    <div className="flex min-h-screen">
      {isLogin && <Sidebar />}
      <div className="flex-1 bg-black text-white p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
