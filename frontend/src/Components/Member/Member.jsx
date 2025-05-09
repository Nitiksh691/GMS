import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MemberCard from '../MemberCard/MemberCard';
import Modal from '../../Pages/modal/modal';
import Addmembership from '../AddMembership/Addmembership';
import AddMember from '../AddMember/AddMember';

const Member = () => {
  const [addMembership, setAddMembership] = useState(false);
  const [addMember, setAddmember] = useState(false);
  const [search, setSearch] = useState('');
  const [isSearchModeOn, setIsSearchModeOn] = useState(false);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [startFrom, setSTartFrom] = useState(0);
  const [endTo, setEndTo] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [noOfPage, setNoOfPage] = useState(0);
  const [limit, setLimit] = useState(9);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let totalData = 52;
    setTotalData(totalData);

    let extraPage = totalData % limit === 0 ? 0 : 1;
    let totalPage = parseInt(totalData / limit) + extraPage;

    setNoOfPage(totalPage);

    if (totalData === 0) {
      // No members
      setSTartFrom(-1);
      setEndTo(0);
    }else if (totalData<10) {
      setSTartFrom(0)
      setEndTo(totalData)
    } else {
      
    }
  };

  const handleSearchData = () => {
    // implement search logic here
    console.log('Search clicked:', search);
  };

  const handleMemberShip = () => {
    setAddMembership((prev) => !prev);
    console.log('Membership clicked');
  };

  const handleMembers = () => {
    setAddmember((prev) => !prev);
    console.log('Add member clicked');
  };

  const handlePrev = () => {
    if (currentPage!==1) {
      let CurrPage= currentPage-1;
      setCurrentPage(CurrPage);
      var from = (CurrPage-1)*9;
      var to = (CurrPage*9);
      setSTartFrom(from);
      setEndTo(to)
    }
  };

  const handleNext = () => {
    if (currentPage !== noOfPage) {
      let CurrPage= currentPage + 1;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  + 1;
      setCurrentPage(CurrPage);
      var from = (CurrPage-1)*9;
      var to = (CurrPage*9);
      if(to>totalData){
        to=totalData;
      }
      setSTartFrom(from);
      setEndTo(to)

    }
  };

  return (
    <div className='text-black p-5 w-3/4 text-green-700'>
      {/* Banner */}
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

      {/* Back link */}
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
        {!isSearchModeOn ? (
          <div className='flex gap-5'>
            <div>
              {startFrom + 1} - {endTo} of {totalData} Members
            </div>
            <div
              className={`w-8 h-8 cursor-pointer border-2 flex items-center justify-center hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ${
                currentPage === 1 ? 'bg-gray-200 text-gray-400' : 'null'
              }`}
              onClick={handlePrev}
            >
              <ChevronLeftIcon />
            </div>
            <div
              className={`w-8 h-8 cursor-pointer border-2 flex items-center justify-center hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ${
                currentPage === noOfPage ? 'bg-gray-200 text-gray-400' : 'null'
              }`}
              onClick={handleNext}
            >
              <ChevronRightIcon />
            </div>
          </div>
        ) : null}
      </div>

      {/* Member Cards */}
      <div className='bg-slate-100 p-5 mt-5 rounded-lg grid grid-cols-3 gap-5 overflow-y-auto h-[65%]'>
        <MemberCard />
        <MemberCard />
        <MemberCard />
      </div>

      {/* Modals */}
      {addMembership && (
        <Modal
          header='Add Membership'
          handleClose={handleMemberShip}
          content={<Addmembership handleClose={handleMemberShip} />}
        />
      )}
      {addMember && (
        <Modal
          header='Add New Member'
          handleClose={handleMembers}
          content={<AddMember />}
        />
      )}
    </div>
  );
};

export default Member;
