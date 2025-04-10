import React from "react";

const Modal = ({ closeModal, content }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-96 max-w-md relative"> {/* Adjust the width here */}
        {/* Headline for Forgot Password */}
        <h3 className="text-xl font-bold mb-4 text-center text-gray-800">Forgot Password</h3>

        <div className="mb-4">
          {/* Render the content dynamically */}
          <div className="w-full p-3 bg-gray-200 text-black rounded-md">
            {content} {/* Render passed content here */}
          </div>
        </div>

        {/* Close button positioned near the modal window */}
        <button
          onClick={closeModal}
          className="absolute top-7 right-3 text-red-500 hover:text-red-700 text-sm underline"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
