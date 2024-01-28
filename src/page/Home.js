import React from 'react'
import AdminDashboard from '../components/AdminDashboard'
import Files from '../components/File'
import Sidebar from '../components/Sidebar'
import UploadFile from '../components/UploadFile'
import UserNotLoggedIn from './UserNotLoggedIn'

const Home = () => {

  const user = JSON.parse(localStorage.getItem("user"))
  if (user === null) {
    // Handle user not logged in scenario
    return (<>
    <UserNotLoggedIn/>
    </>
    )
  }

  return (
    <div className='flex h-full flex-col  md:flex-row'>
      {user === null && <h1>Page not found</h1>}
      <div className='md:fixed h-full'>
        <Sidebar />
      </div>
      <div className="h-screen md:flex-1 p-7 md:ml-80">
        <input className='w-full  rounded p-2 bg-[#F0F6FD]' placeholder='Search for folders' />
        <UploadFile />
        {user && user.role === "admin" && <AdminDashboard />}
        <Files />
      </div>
    </div>
  )
}

export default Home