import { useAuth } from "../context/AuthContext";

const { useState } = require("react");

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [showSidebarList, setSidebarList] = useState(false)
  const {logOut} = useAuth();
  const user = JSON.parse(localStorage.getItem("user"))

  return (
    <div
      className={` ${open ? "md:w-72 w-full" : "w-20 "
        } bg-[#F0F6FD]  text-blue-600  h-[10vh] md:h-full  p-5   pt-8 relative duration-300`}
    >
      <i className={`fa fa-toggle-up md:hidden  text-blue-600 absolute cursor-pointer -right-0 top-6  md:-right-2 md:top-9 w-7 border-dark-purple
           text-2xl  ${!showSidebarList && "rotate-180"}`}
        onClick={() => setSidebarList(!showSidebarList)}></i>
      <i
        className={`fa fa-toggle-left hidden md:block text-blue-600 absolute cursor-pointer -right-0 top-6  md:-right-2 md:top-9 w-7 border-dark-purple
           text-2xl  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex gap-x-4 items-center text-2xl ">
        <i
          className={` fa fa-desktop  cursor-pointer duration-500 ${open && "rotate-[360deg]"
            }`}
        />
        <h1
          className={` origin-left font-semibold text-xl duration-200 ${!open && "scale-0"
            }`}
        >
          Designer
        </h1>
        
      </div>
      <h2 className="text-left">{open ? user.email : user.role}</h2>

      {showSidebarList && (
        <ul className="pt-6 flex h-[400px] md:hidden  flex-col backdrop-blur-xl w-full  items-center z-10  pb-6">
        <div>
          <li
            className={`flex text-xl rounded-md p-2 cursor-pointer hover:bg-light-white text-sm items-center gap-x-4 
      mt-2 bg-light-white`}
          >
            <i className="fa fa-dashboard " />
            <span className={`${!open && "hidden"}  origin-left duration-200`}>
              Dashboard
            </span>
          </li>
          <li
            className={`flex text-xl rounded-md p-2 cursor-pointer hover:bg-light-white  text-sm items-center gap-x-4 
      mt-2 bg-light-white`}
          >
            <i className="fa fa-share-alt" />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              Shared files
            </span>
          </li>
          <li
            className={`flex text-xl rounded-md p-2 cursor-pointer hover:bg-light-white  text-sm items-center gap-x-4 
      mt-2 bg-light-white`}
          >
            <i className="fa fa-star" />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              Favourites
            </span>
          </li>
        </div>
        <div>
          <li
            className={`flex text-xl rounded-md p-2 cursor-pointer hover:bg-light-white  text-sm items-center gap-x-4 
      mt-2 bg-light-white`}
          >

            <i className="fa fa-gear" />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              Setting
            </span>
          </li>
          <li onClick={logOut}
            className={`flex text-xl rounded-md p-2 cursor-pointer hover:bg-light-white  text-sm items-center align-end gap-x-4 
      mt-2 bg-light-white`}
          >
            <i className="fa fa-sign-out" />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              Logout
            </span>
          </li>
        </div>
      </ul>
      )}

      <ul className="pt-6 hidden md:flex flex-col h-full  md:justify-between  pb-6">
        <div>
          <li
            className={`flex text-xl rounded-md p-2 cursor-pointer hover:bg-light-white text-sm items-center gap-x-4 
      mt-2 bg-light-white`}
          >
            <i className="fa fa-dashboard " />
            <span className={`${!open && "hidden"}  origin-left duration-200`}>
              Dashboard
            </span>
          </li>
          <li
            className={`flex text-xl rounded-md p-2 cursor-pointer hover:bg-light-white  text-sm items-center gap-x-4 
      mt-2 bg-light-white`}
          >
            <i className="fa fa-share-alt" />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              Shared files
            </span>
          </li>
          <li
            className={`flex text-xl rounded-md p-2 cursor-pointer hover:bg-light-white  text-sm items-center gap-x-4 
      mt-2 bg-light-white`}
          >
            <i className="fa fa-star" />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              Favourites
            </span>
          </li>
        </div>
        <div>
          <li
            className={`flex text-xl rounded-md p-2 cursor-pointer hover:bg-light-white  text-sm items-center gap-x-4 
      mt-2 bg-light-white`}
          >

            <i className="fa fa-gear" />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              Setting
            </span>
          </li>
          <li onClick={logOut}
            className={`flex text-xl rounded-md p-2 cursor-pointer hover:bg-light-white  text-sm items-center align-end gap-x-4 
      mt-2 bg-light-white`}
          >
            <i className="fa fa-sign-out" />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              Logout
            </span>
          </li>
        </div>
      </ul>
    </div>
  )
}

export default Sidebar