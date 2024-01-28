import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([])
  const { deleteUser, fetchUsers } = useUser()

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      await fetchUsers().then(setUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchUsers().then(setUsers)
  }, [])

  return (
    <div className='w-full '>
      <div className=''>
        <p className=' md:text-2xl pt-4 text-blue-600 text-left font-semibold'>All Users
        <i className={` fa fa-arrow-up text-xl text-blue-600  cursor-pointer p-2 
             ${!open && "rotate-180  "}`}
            onClick={() => setOpen(!open)}
          />
          </p>
      </div>
      <div className={` ${open ? "block" : "hidden"} text-blue-600 p-5 bg-white shadow-xl rounded-xl pt-8 relative duration-300`}>

        <div className="overflow-x-auto">
        <table className="table-auto  min-w-full border-spacing-y-4 border-separate rounded-xl  w-full">
          <thead >
            <tr className=" text-blue-800 rounded p-2 mt-6 w-full bg-[#F0F6FD]  ">
              <th className=" px-4 py-2 text-left">S.No</th>
              <th className=" px-4 py-2">Email</th>
              <th className=" px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody >

          {users.map((user, index) => (
            <tr key={user._id} className=" text-blue-600 rounded p-2 mt-6 w-full bg-[#F0F6FD]  ">
            <td className=" px-4 py-2 text-left">{index + 1}</td>
            <td className=" px-4 py-2 ">{user.email}</td>
            <td className=" px-4 py-2 ">
              <i className= "fa fa-trash hover:scale-125 ease-in-out duration-300 cursor-pointer text-red-700" onClick={() => handleDeleteUser(user._id)}></i>
            </td>
          </tr>
          ))}
          </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
