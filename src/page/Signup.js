import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { signUp } = useAuth();


  const handleSignup = async (e) => {
    e.preventDefault();

    // Clear previous error messages
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('')

    // Simple email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
      return;
    }

    // Minimum password length validation
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }

    // Call signup function

    if(password !== confirmPassword){
        setConfirmPasswordError("Password not matched")
        return;
    }

     await signUp(email, password, role);
  };

  return (
    <div className=' bg-[#F0F6FD] h-[100vh] grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-r from-white to-blue-200'>
       <div className='lg:col-span-1 lg:block hidden m-auto w-full pt-10'>
        <img src="./login.png" alt="login" className='object-cover w-full h-full lg:block' />
      </div>
      <div className='block m-auto w-full pt-10'>
        <i className="fa fa-lock text-6xl text-blue-600"></i>
        <h2 className="text-2xl text-blue-600 mb-4">Signup</h2>
        <div className=" px-4  m-auto  border-[#424769] rounded  w-full sm:w-96">
          <form onSubmit={handleSignup}>

            <div className="mb-4">
              <input
                type="email"
                id="email"
                name="email"
                placeholder='Email'
                className={`w-full  px-3 py-2 bg-[#ecf4ff]  rounded-md focus:outline-none focus:border-blue-500 ${
                  emailError && 'border-red-500'
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
            </div>

            <div className="mb-4 relative">
              <input
                type= {showPassword ? "text" : "password"} 
                id="password"
                name="password"
                placeholder='password'
                className={`w-full  px-3 py-2 bg-[#ecf4ff]  rounded-md focus:outline-none focus:border-blue-500 ${
                  passwordError && 'border-red-500'
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className='absolute top-2 right-5 cursor-pointer'>
                {showPassword ? <i className='fa fa-eye-slash text-xl' onClick={() => setShowPassword(!showPassword)}></i> :  <i className='fa fa-eye text-xl' onClick={() => setShowPassword(!showPassword)}></i>}
            </div>
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            </div>

            <div className="mb-4 relative">
              <input
                type= {showConfirmPassword ? "text" : "password"} 
                id="confirm password"
                name="confirm password"
                placeholder='confirm password'
                className={`w-full  px-3 py-2 bg-[#ecf4ff]  rounded-md focus:outline-none focus:border-blue-500 ${
                  passwordError && 'border-red-500'
                }`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {confirmPasswordError && <p className="text-red-500 text-sm">{confirmPasswordError}</p>}
              <div className='absolute top-2 right-5 cursor-pointer'>
                {showConfirmPassword ? <i className='fa fa-eye-slash text-xl' onClick={() => setShowConfirmPassword(!showConfirmPassword)}></i> :  <i className='fa fa-eye text-xl' onClick={() => setShowConfirmPassword(!showConfirmPassword)}></i>}
            </div>
            </div>
            

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:shadow-outline-blue"
            >
              Signup
            </button>
          </form>
        </div>
        <div className=" mt-4 border-[#424769] p-8 m-auto rounded shadow-lg w-full sm:w-96">
          <p className='text-[#2D3250] '>Already have an account ? <Link className='text-blue-400' to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
