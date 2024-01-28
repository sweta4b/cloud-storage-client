import React from 'react'
import { useNavigate } from 'react-router'

const UserNotLoggedIn = () => {
    const navigate = useNavigate()
    return (
        <div
            className="fixed top-0 left-0 w-full h-full flex items-center  backdrop-blur-sm justify-center ">
            <div className="bg-white p-8 rounded-md text-center">
                {/* <i className='fa fa-check-circle text-2xl font-bold text-blue-600'></i> */}
                <h2 className="text-2xl font-bold mb-4">Click to Login</h2>
                <button
                    onClick={() => navigate('/login')}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:shadow-outline-blue"
                >
                    Login
                </button>
            </div>
        </div>
    )
}

export default UserNotLoggedIn