import React, { useState } from 'react'
import SideBar from '../components/SideBar'
import ChatContainer from '../components/ChatContainer'
import RightsideBar from '../components/RightsideBar'

const HomePage = () => {
  const [selectedUser, setSelectedUser] = useState(false);

  return (
    <div className="w-full h-screen sm:px-[15%] sm:py-[5%]">
      <div
        className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-full 
        grid grid-cols-1 relative transition-all duration-300 
        ${selectedUser
          ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]'
          : 'md:grid-cols-2 xl:grid-cols-[1fr_1.2fr]'
        }`}
      >

          <SideBar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
          <ChatContainer selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
          <RightsideBar selectedUser= {selectedUser} setSelectedUser={setSelectedUser} />
      </div>
    </div>
  )
}

export default HomePage
