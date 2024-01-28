// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './page/Login';
import Signup from './page/Signup';
import './App.css'
// import AdminDashboard from './components/AdminDashboard';
// import UserDashboard from './components/UserDashboard';
import Home from './page/Home';
// import ProtectedRoute from './utils/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import Registered from './page/Registered';
import { useAuth } from './context/AuthContext';

function App() {
  

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/registered" element={<Registered/>}/>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
