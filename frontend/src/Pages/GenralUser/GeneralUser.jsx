import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const GeneralUser = () => {
  const [header, setHeader] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const func = sessionStorage.getItem('func');
    functionCall(func);
  }, []);

  const functionCall = async (func) => {
    switch (func) {
      case "members-joined":
        setHeader("All Joined Members");
        break;
      case "monthly-joined":
        setHeader("Monthly Joined Members");
        break;
      case "three-day-expire":
        setHeader("Expiry Within 3 Days");
        break;
      case "four-seven-expire":
        setHeader("Expiry in 4-7 Days");
        break;
      case "expired":
        setHeader("Expired Members");
        break;
      case "inactive-members":
        setHeader("Inactive Members");
        break;
      default:
        setHeader("General User");
    }
  };

  return (
    <div className='text-black p-5 w-3/4 flex-col'>
      <div className='border-2 bg-slate-900 flex justify-between w-full text-white rounded-lg p-3'>
        <Link to={'/dashboard'} className='border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black'>
          <ArrowBackIcon /> Back To Dashboard
        </Link>
      </div>

      <div className='mt-5 text-xl text-slate-900 font-semibold'>
        {header}
      </div>

      {/* You can map and show actual data here if needed */}
      <div className='mt-3'>
        {data.length === 0 ? (
          <p>No data loaded.</p>
        ) : (
          data.map((item, index) => (
            <div key={index} className='p-2 border-b'>{item}</div>
          ))
        )}
      </div>
    </div>
  );
};

export default GeneralUser;
