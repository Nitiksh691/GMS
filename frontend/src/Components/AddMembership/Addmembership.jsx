import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const AddMembership = ({ handleClose }) => {
  const [inputField, setInputField] = useState({ months: '', price: '' });
  const [memberships, setMemberships] = useState([]);

  useEffect(() => {
    fetchMemberships();
  }, []);

  const fetchMemberships = async () => {
    try {
      const res = await axios.get('http://localhost:5000/plans/getmembership', {
        withCredentials: true,
      });
      console.log(res)
      setMemberships(res.data.memberships);
    } catch (err) {
      console.error('Fetch Membership Error:', err);
    }
  };

  const handleChange = (e, field) => {
    setInputField(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleAddMembership = async () => {
    const { months, price } = inputField;

    if (!months || !price) {
      return toast.error('Please fill in both fields');
    }

    try {
      const res = await axios.post(
        'http://localhost:5000/plans/add-membership',
        { months, price },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setInputField({ months: '', price: '' });
        fetchMemberships();
      } else {
        toast.error(res.data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error('Add Membership Error:', err);
      toast.error('Failed to add membership');
    }
  };

  return (
    <div className='text-black'>
      <div className='flex flex-wrap gap-5 items-center justify-center'>
        {memberships.map((item, index) => (
          <div key={index} className='text-lg bg-slate-900 text-white p-2 rounded'>
            {item.months} Month - ₹{item.price}
          </div>
        ))}
      </div>

      <hr className='mt-10 mb-10' />

      <div className='flex gap-10 mb-10'>
        <input
          value={inputField.months}
          onChange={(e) => handleChange(e, 'months')}
          className='border-2 rounded-lg text-lg w-1/3 p-2'
          type='number'
          placeholder='Add No. of Months'
        />

        <input
          value={inputField.price}
          onChange={(e) => handleChange(e, 'price')}
          className='border-2 rounded-lg text-lg w-1/3 p-2'
          type='number'
          placeholder='Add Price'
        />

        <button
          onClick={handleAddMembership}
          className='text-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl hover:opacity-90'
        >
          Add +
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddMembership;
