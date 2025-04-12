import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ReportIcon from '@mui/icons-material/Report';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import { Link } from 'react-router-dom';

const CardBlock = ({ icon, title }) => {
  return (
    <div className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer hover:shadow-xl transition duration-200 ease-in-out">
      <div className='h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'></div>
      <div className='py-7 px-5 flex flex-col justify-center items-center text-center rounded-b-lg hover:bg-slate-900 hover:text-white'>
        {icon}
        <p className='text-xl my-3 font-semibold font-mono'>{title}</p>
      </div>
    </div>
  );
};

const handleClickMenu = (value) => {
  sessionStorage.setItem("func", value);
};

const Dashboard = () => {
  const [accordionDashboard, setAccordionDashboard] = React.useState(false);

  return (
    <div className='w-3/4 text-black p-5 relative'>
      <div className='w-full bg-slate-900 text-white rounded-lg flex p-3 justify-between items-center'>
        <MenuIcon sx={{ cursor: 'pointer' }} onClick={() => setAccordionDashboard(prev => !prev)} />
        <img
          className='w-8 h-8 rounded-full border-2'
          src='https://static.vecteezy.com/system/resources/previews/002/265/650/large_2x/unknown-person-user-icon-for-web-vector.jpg'
          alt='User'
        />
      </div>

      <div className='mt-5 pt-3 bg-slate-100 bg-opacity-50 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full pb-5 overflow-x-auto h-[80%]'>
        <Link to={'/member'} onClick={() => handleClickMenu("members-joined")}>
          <CardBlock icon={<PeopleAltIcon sx={{ color: 'blue', fontSize: 50 }} />} title="Members Joined" />
        </Link>
        <Link to={'/specific/monthly-joined'} onClick={() => handleClickMenu("monthly-joined")}>
          <CardBlock icon={<PersonAddAltIcon sx={{ color: 'green', fontSize: 50 }} />} title="Monthly Joined" />
        </Link>
        <Link to={'/specific/expired-in-3-days'} onClick={() => handleClickMenu("three-day-expire")}>
          <CardBlock icon={<AccessAlarmIcon sx={{ color: 'orange', fontSize: 50 }} />} title="Expiry Within 3 Days" />
        </Link>
        <Link to={'/specific/expired-4-7-days'} onClick={() => handleClickMenu("four-seven-expire")}>
          <CardBlock icon={<WatchLaterIcon sx={{ color: 'goldenrod', fontSize: 50 }} />} title="Expiry in 4-7 Days" />
        </Link>
        <Link to={'/specific/expired'} onClick={() => handleClickMenu("expired")}>
          <CardBlock icon={<ReportIcon sx={{ color: 'red', fontSize: 50 }} />} title="Expired" />
        </Link>
        <Link to={'/specific/inactive'} onClick={() => handleClickMenu("inactive-members")}>
          <CardBlock icon={<PersonOffIcon sx={{ color: 'gray', fontSize: 50 }} />} title="Inactive Members" />
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
