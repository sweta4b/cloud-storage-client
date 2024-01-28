import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Registered = () => {
    const navigate = useNavigate();
    const userString = localStorage.getItem("user");

    useEffect(() => {
        try {
            const user = JSON.parse(userString);

            if (!user) {
                navigate('/login');
            } else {
                console.log("User data:", user);
            }
        } catch (error) {
            console.error("Error parsing user data from localStorage", error);
            navigate('/login');
        }
    }, [userString, navigate]);

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#F0F6FD] bg-gradient-to-r from-white to-blue-200">
            <div className="p-8 rounded-md text-center">
                <i className='fa fa-check-circle text-2xl font-bold text-blue-600'></i>
                <h2 className="text-2xl font-bold mb-4">User Registered Successfully</h2>
                <button
                    onClick={() => navigate('/login')}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:shadow-outline-blue"
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Registered;
