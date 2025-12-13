import React from 'react'
import assets, { userDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const SideBar = ({ selectedUser, setSelectedUser }) => {
  const navigate = useNavigate();

  return (
    <div className={`bg-gradient-to-b from-[#787CB4] to-[#5A5D8F] h-screen flex flex-col p-5 rounded-r-xl text-white ${selectedUser ? "max-md:hidden" : ""}`}>
      
      {/* Top Section */}
      <div className="pb-5 flex-shrink-0">
        <div className="flex justify-between items-center">
          <img src={assets.logo} alt="logo" className="max-w-[160px]" />

          <div className="relative py-2 group">
            <img src={assets.menu_icon} alt="Menu" className="max-h-5 cursor-pointer" />
            <div className="absolute top-full right-0 z-20 w-40 p-4 mt-2 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block transition-all duration-200">
              <p onClick={() => navigate('/profile')} className="cursor-pointer text-sm hover:text-violet-300">
                Make Some Changes
              </p>
              <hr className="my-2 border-t border-gray-500" />
              <p className="cursor-pointer text-sm hover:text-violet-300">Log Out</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-5">
          <div className="bg-[#282142] rounded-full flex items-center gap-3 py-3 px-4">
            <img src={assets.search_icon} alt="Search" className="w-4" />
            <input
              type="text"
              className="bg-transparent border-none outline-none text-white text-sm placeholder-[#c8c8c8] flex-1"
              placeholder="Search here..."
            />
          </div>
        </div>
      </div>

      {/* User List (Scrollable Section) */}
      <div className="flex-1 overflow-y-auto mt-4 pr-1">
        {userDummyData.map((user, index) => (
          <div
            onClick={() => setSelectedUser(user)} // ✅ Corrected here
            key={index}
            className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer hover:bg-[#282142]/30 transition-all
              ${selectedUser?._id === user.id ? 'bg-[#282142]/50' : ''}`}
          >
            <img src={user?.profilePic || assets.avatar_icon} alt="" className="w-[35px] aspect-square rounded-full" />
            <div className="flex flex-col leading-5">
              <p>{user.fullName}</p>
              {index < 3
                ? <span className="text-green-400 text-xs">Online</span>
                : <span className="text-neutral-400 text-xs">Offline</span>}
            </div>
            {index > 2 && (
              <p className="absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50">
                {index}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SideBar
    