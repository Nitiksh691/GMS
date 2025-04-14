import React, { useState } from 'react';

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

  const handleOnChange = (e, field) => {
    setInputField({ ...inputField, [field]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInputField((prev) => ({ ...prev, profilePic: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = '';

    if (inputField.profilePic) {
      const data = new FormData();
      data.append('file', inputField.profilePic);
      data.append('upload_preset', 'gym-management-system'); // 🔁 Your preset
      data.append('cloud_name', 'dr4nfueet'); // 🔁 Your Cloudinary cloud name

      try {
        const res = await fetch('https://api.cloudinary.com/v1_1/dr4nfueet/image/upload', {
          method: 'POST',
          body: data,
        });
        const result = await res.json();
        imageUrl = result.secure_url;
      } catch (err) {
        console.error('Cloudinary Upload Error:', err);
      }
    }

    const finalData = {
      ...inputField,
      profilePic: imageUrl || '',
    };

    console.log('New Member Data:', finalData);

    // Here you can send `finalData` to your backend if needed
  };

  return (
    <form onSubmit={handleSubmit} className='text-black'>
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

        {/* Image Upload */}
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

      <button
        type="submit"
        className="mt-6 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
      >
        Add Member
      </button>
    </form>
  );
};

export default AddMember;
