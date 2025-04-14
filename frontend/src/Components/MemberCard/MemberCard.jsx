import React from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import { Link } from 'react-router-dom';

const MemberCard = () => {
  return (
    <Link to={'/member/123'} className="bg-white p-3 rounded-lg shadow-md hover:bg-gradient-to-r from-indigo-500 to-pink-500 hover:text-white transition-all cursor-pointer">
      <div className="w-28 h-28 flex justify-center items-center border-2 p-1 rounded-full relative mx-auto">
        <img
          src="https://via.placeholder.com/100"
          alt="member"
          className="w-full h-full rounded-full object-cover"
        />
        <CircleIcon className="absolute top-1 left-1 text-green-400" />
      </div>
      <div className="text-center mt-4">
        <div className="text-xl font-semibold font-mono">John Doe</div>
        <div>+91 9876543210</div>
        <div className="text-sm mt-1">Next Bill: 25 April 2025</div>
      </div>
    </Link>
  );
};

export default MemberCard;
