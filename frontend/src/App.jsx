import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./Components/Dsashboard/Dashboard";
import Sidebar from "./Pages/Sidebar/sidebar";
import Member from "./Components/Member/Member";
import Home from "./Pages/Home/home";
import GeneralUser from "./Pages/GenralUser/GeneralUser";
import MemberDetails from "./Components/MemberDetails/MemberDetails";
import 'react-toastify/dist/ReactToastify.css';
import ResetPassword from "./Pages/ResetPass/ResetPass";

function App() {
  const navigate = useNavigate();
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLogin");
    if (isLoggedIn) {
      setLogin(true);
      navigate('/dashboard')
    }else{
      setLogin(false)
      navigate('/')
    }
  
  }, [localStorage.getItem("isLogin")]);

  return (
    <div className="flex min-h-screen">
    {isLogin && <Sidebar />}
    <div className="flex-1 p-8 bg-gray-100 overflow-auto">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/member" element={<Member />} />
        <Route path="/specific/:pages" element={<GeneralUser />} />
        <Route path="/member/:id" element={<MemberDetails />} />
        <Route path="/reset-password/:token" element={<ResetPassword/>} />
      </Routes>
    </div>
  </div>
  );
}

export default App;





// setLogin(isLoggedIn === "true");
// navigate(isLoggedIn === "true" ? "/dashboard" : "/");
