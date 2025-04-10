import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MemberCard from '../MemberCard/MemberCard';

const Member = () => {
  const [search, setSearch] = useState('');
  const [isSearchModeOn, setIsSearchModeOn] = useState(false);
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [noOfPage, setNoOfPage] = useState(6); // example default

  const handleSearchData = () => {
    setIsSearchModeOn(true);
    // Implement your search logic here
    console.log('Searching for:', search);
  };

  const handleMembers = () => {
    // handle add member logic here
    console.log('Add member clicked');
  };

  const handleMemberShip = () => {
    // handle membership logic here
    console.log('Membership clicked');
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < noOfPage) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <div className='text-black p-5 w-3/4 text-green-700'>
      {/* banner */}
      <div className='bg-slate-900 flex justify-between w-full text-white rounded-lg p-3'>
        <div
          className='border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black'
          onClick={handleMembers}
        >
          Add Member <FitnessCenterIcon />
        </div>
        <div
          className='border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black'
          onClick={handleMemberShip}
        >
          Membership <AddIcon />
        </div>
      </div>

      <Link to={'/dashboard'} className='flex items-center gap-2 mt-3 text-blue-600 hover:underline'>
        <ArrowBackIcon /> Back to Dashboard
      </Link>

      {/* Search bar */}
      <div className='mt-5 w-1/2 flex gap-2'>
        <input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='border-2 w-full p-2 rounded-lg'
          placeholder='Search By Name or Mobile No'
        />
        <div
          onClick={handleSearchData}
          className='bg-slate-900 p-3 border-2 text-white rounded-lg cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black'
        >
          <SearchIcon />
        </div>
      </div>

      {/* Summary and pagination */}
      <div className='mt-5 text-xl flex justify-between text-slate-900'>
        <div>Total Members {isSearchModeOn ? totalData : null}</div>
        {!isSearchModeOn && (
          <div className='flex gap-5'>
            <div>{`${(currentPage - 1) * 9 + 1}-${Math.min(currentPage * 9, 53)} of 53 Members`}</div>
            <div
              className={`w-8 h-8 cursor-pointer border-2 flex items-center justify-center rounded-full hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ${
                currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : ''
              }`}
              onClick={handlePrev}
            >
              <ChevronLeftIcon />
            </div>
            <div
              className={`w-8 h-8 cursor-pointer border-2 flex items-center justify-center rounded-full hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ${
                currentPage === noOfPage ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : ''
              }`}
              onClick={handleNext}
            >
              <ChevronRightIcon />
            </div>
          </div>
        )}
      </div>

      {/* Member Cards */}
      <div className='bg-slate-100 p-5 mt-5 rounded-lg grid grid-cols-3 gap-5 overflow-y-auto h-[65%]'>
        <MemberCard />
        <MemberCard />
        <MemberCard />
      </div>
    </div>
  );
};

export default Member;
