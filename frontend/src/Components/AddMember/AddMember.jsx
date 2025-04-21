import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddMember = ({ handleClose }) => {
  const [inputField, setInputField] = useState({
    name: '',
    phone: '',
    address: '',
    date: '',
    membership: '1 Month Membership',
    profilePic: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e, field) => {
    setInputField(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInputField(prev => ({ ...prev, profilePic: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = '';

    // Upload to Cloudinary
    if (inputField.profilePic) {
      const data = new FormData();
      data.append('file', inputField.profilePic);
      data.append('upload_preset', 'gym-management-system');
      data.append('cloud_name', 'dr4nfueet');

      try {
        const res = await fetch('https://api.cloudinary.com/v1_1/dr4nfueet/image/upload', {
          method: 'POST',
          body: data,
        });
        const result = await res.json();
        imageUrl = result.secure_url;
      } catch (err) {
        console.error('Cloudinary Upload Error:', err);
        toast.error('Image upload failed');
        return;
      }
    }

    const selectedMonths = parseInt(inputField.membership.split(' ')[0]);
    const membershipPrice = selectedMonths * 1000; // change logic if needed

    try {
      // 1. Add Membership
      const membershipRes = await axios.post(
        'http://localhost:5000/plans/add-membership',
        {
          months: selectedMonths,
          price: membershipPrice,
        },
        {
          withCredentials: true,
        }
      );

      if (membershipRes.data.success) {
        toast.success(membershipRes.data.message);
      }

      // 2. Add Member
      const memberRes = await axios.post(
        'http://localhost:5000/members/add-membership',
        {
          name: inputField.name,
          phone: inputField.phone,
          address: inputField.address,
          date: inputField.date,
          membership: `${selectedMonths} Month Membership`,
          profilePic: imageUrl || '',
        },
        {
          withCredentials: true,
        }
      );

      if (memberRes.data.success) {
        toast.success('Member added successfully');

        setInputField({
          name: '',
          phone: '',
          address: '',
          date: '',
          membership: '1 Month Membership',
          profilePic: null,
        });
        setPreviewImage(null);

        if (handleClose) handleClose();
      } else {
        toast.error(memberRes.data.message || 'Failed to add member');
      }
    } catch (err) {
      console.error('Add Member Error:', err);
      toast.error('Server error while adding member');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='text-black'>
      <div className='grid gap-5 grid-cols-2 text-lg'>
        <input
          value={inputField.name}
          onChange={(e) => handleChange(e, 'name')}
          placeholder='Name of the Joinee'
          type='text'
          className='border-2 w-[90%] p-2 border-slate-400 rounded-md h-12'
        />

        <input
          value={inputField.phone}
          onChange={(e) => handleChange(e, 'phone')}
          placeholder='Mobile No'
          type='text'
          className='border-2 w-[90%] p-2 border-slate-400 rounded-md h-12'
        />

        <input
          value={inputField.address}
          onChange={(e) => handleChange(e, 'address')}
          placeholder='Enter Address'
          type='text'
          className='border-2 w-[90%] p-2 border-slate-400 rounded-md h-12'
        />

        <input
          value={inputField.date}
          onChange={(e) => handleChange(e, 'date')}
          type='date'
          className='border-2 w-[90%] p-2 border-slate-400 rounded-md h-12'
        />

        <select
          value={inputField.membership}
          onChange={(e) => handleChange(e, 'membership')}
          className='border-2 w-[90%] p-2 border-slate-400 rounded-md h-12'
        >
          <option>1 Month Membership</option>
          <option>3 Month Membership</option>
          <option>6 Month Membership</option>
        </select>

        <div className="col-span-2">
          <label className="block text-sm mb-2">Upload Profile Picture</label>
          <div
            className="border-2 border-dashed border-gray-500 rounded-md p-4 text-center cursor-pointer hover:border-red-600 transition-all"
            onClick={() => document.getElementById("member-image-upload").click()}
          >
            <p className="text-gray-600">Click or Drag & Drop to upload</p>
            <input
              id="member-image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {previewImage && (
            <div className="mt-4 text-center">
              <img
                src={previewImage}
                alt="Preview"
                className="w-24 h-24 object-cover mx-auto rounded-md border-4 border-white shadow-lg"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
        >
          Add Member
        </button>
      </div>

      <ToastContainer />
    </form>
  );
};

export default AddMember;
