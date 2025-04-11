import React, { useState } from 'react';

const AddMember = ({ handleClose }) => {
  const [inputField, setInputField] = useState({
    name: '',
    phone: '',
    address: '',
    date: '',
    membership: '1 Month Membership',
  });

  const handleOnChange = (e, field) => {
    setInputField({ ...inputField, [field]: e.target.value });
  };

  return (
    <div className='text-black'>
      <div className='grid gap-5 grid-cols-2 text-lg'>
        <input
          value={inputField.name}
          onChange={(e) => handleOnChange(e, 'name')}
          placeholder='Name of the Joinee'
          type='text'
          className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12'
        />

        <input
          value={inputField.phone}
          onChange={(e) => handleOnChange(e, 'phone')}
          placeholder='Mobile No'
          type='text'
          className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12'
        />

        <input
          value={inputField.address}
          onChange={(e) => handleOnChange(e, 'address')}
          placeholder='Enter Address'
          type='text'
          className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12'
        />

        <input
          value={inputField.date}
          onChange={(e) => handleOnChange(e, 'date')}
          type='date'
          className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12'
        />

        <select
          value={inputField.membership}
          onChange={(e) => handleOnChange(e, 'membership')}
          className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12'
        >
          <option>1 Month Membership</option>
          <option>3 Month Membership</option>
          <option>6 Month Membership</option>
        </select>
      </div>
    </div>
  );
};

export default AddMember;
