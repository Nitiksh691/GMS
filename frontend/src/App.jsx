import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Components/Home/home";
import Dashboard from "./Components/Dsashboard/Dashboard";
import Sidebar from "./Pages/Sidebar/sidebar";
import Member from "./Components/Member/Member";

function App() {
  const navigate = useNavigate();
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLogin");
    if (isLoggedIn) {
      setLogin(true);
      // navigate('/dashboard')
    }else{
      navigate('/')
    }
  
  }, [sessionStorage.getItem("isLogin")]);

  return (
    <div className="flex min-h-screen ">
      {isLogin && <Sidebar />}
      <div className="flex-1   text-white p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/member" element={<Member/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;





// setLogin(isLoggedIn === "true");
// navigate(isLoggedIn === "true" ? "/dashboard" : "/");
