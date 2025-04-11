import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Addmembership = ({ handleClose }) => {
  const [inputField, setInputField] = useState({
    months: '',
    price: ''
  });

  const handleOnChange = (e, field) => {
    setInputField({ ...inputField, [field]: e.target.value });
  };

  const handleAddmembership = () => {
    if (inputField.months && inputField.price) {
      toast.success(`Added ${inputField.months} month(s) membership for ₹${inputField.price}`);
      setInputField({ months: '', price: '' });
    } else {
      toast.error('Please fill in both fields');
    }
  };

  return (
    <div className='text-black'>
      <div className='flex flex-wrap gap-5 items-center justify-center'>
        <div className='text-lg bg-slate-900 text-white p-2 rounded'>Add New Membership</div>
      </div>

      <hr className='mt-10 mb-10' />
      <div className='flex gap-10 mb-10'>
        <input
          value={inputField.months}
          onChange={(e) => handleOnChange(e, 'months')}
          className='border-2 rounded-lg text-lg w-1/3 h-1/2 p-2'
          type='number'
          placeholder='Add No. of Months'
        />

        <input
          value={inputField.price}
          onChange={(e) => handleOnChange(e, 'price')}
          className='border-2 rounded-lg text-lg w-1/3 h-1/2 p-2'
          type='number'
          placeholder='Add Price'
        />

        <div
          onClick={handleAddmembership}
          className='text-lg border-2 p-1 w-auto mt-0 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
        >
          Add +
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Addmembership;
