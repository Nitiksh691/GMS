import React, { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import Switch from 'react-switch';
import { ToastContainer, toast } from 'react-toastify';

const MemberDetails = () => {
    const navigate = useNavigate();

    const [status, setStatus] = useState("Pending");
    const [renew, setRenew] = useState(false);

    const handleSwitchBtn = () => {
        setStatus(prev => (prev === "Active" ? "Pending" : "Active"));
    };

    return (
        <div className="w-full px-4 py-6 md:w-3/4 mx-auto text-black">
            <ToastContainer />
            <div
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-white text-lg font-medium w-fit px-4 py-2 bg-slate-900 rounded-xl cursor-pointer hover:bg-slate-800 transition-all"
            >
                <ArrowBackIcon /> Go Back
            </div>

            <div className="mt-10 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3 w-full">
                        <img
                            src="https://via.placeholder.com/300"
                            alt="Member"
                            className="rounded-xl w-full object-cover"
                        />
                    </div>
                    <div className="md:w-2/3 w-full text-lg space-y-4">
                        <div>
                            <span className="font-semibold">Name:</span> John Doe
                        </div>
                        <div>
                            <span className="font-semibold">Mobile:</span> +91 9876543210
                        </div>
                        <div>
                            <span className="font-semibold">Address:</span> Delhi, India
                        </div>
                        <div>
                            <span className="font-semibold">Joined Date:</span> 01 Jan 2025
                        </div>
                        <div>
                            <span className="font-semibold">Next Bill Date:</span> 01 Feb 2025
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="font-semibold text-xl">Status:</span>
                            <Switch
                                onColor="#6366F1"
                                checked={status === "Active"}
                                onChange={handleSwitchBtn}
                            />
                        </div>

                        <div
                            onClick={() => setRenew(prev => !prev)}
                            className={`mt-4 text-center w-full md:w-1/2 py-2 rounded-lg border-2 border-slate-900 cursor-pointer font-semibold transition-all duration-300 ${
                                renew && status === "Active"
                                    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
                                    : "hover:text-white hover:bg-gradient-to-r from-indigo-500 to-purple-500"
                            }`}
                        >
                            Renew
                        </div>

                        {renew && status === "Active" && (
                            <div className="rounded-lg pt-3 mt-5 mb-5 bg-slate-50 w-full md:w-1/2 transition-all animate-fade-in">
                                <div className="my-4 space-y-3">
                                    <div className="font-medium">Select Membership Plan:</div>
                                    <select className="w-full rounded-lg p-2 border-2 border-slate-300">
                                        <option value="">1 Month Plan</option>
                                        <option value="">2 Month Plan</option>
                                    </select>
                                    <button
                                        className="mt-3 w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg font-semibold"
                                        onClick={() => toast.success("Membership renewed successfully!")}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberDetails;
