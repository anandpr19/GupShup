import React, { useEffect, useRef } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { formatMessageTime } from '../lib/utils'

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  const scrollEnd = useRef()

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])
  return selectedUser ? (
    <div className='h-full overflow-scroll relative backdrop-blur-lg'>
      {/*/NAAM PATA */}
      <div className='flex items-center gap-3 py-4 mx-4 border-b border-stone-500'>
        <img src={assets.profile_martin} alt="" className='w-8 rounded-full' />
        <p className='flex-1 text-lg text-white flex items-center gap-2'>Martin Johnson
          <span className='w-2 h-2 rounded-full bg-green-500'></span>
        </p>
        <img onClick={() => setSelectedUser(null)} src={assets.arrow_icon} alt="" className='md:hidden max-w-7' />
        <img src={assets.help_icon} alt="" className='max-md:hidden max-w-5' />
      </div>
      {/*Chat Area Here Buddy*/}
      <div className="flex flex-col gap-3 h-[calc(100%-120px)] overflow-y-scroll p-4 pb-20">

        {messagesDummyData.map((msg, index) => (
          <>
            {/* Time Divider */}
            {index === 0 ||
              formatMessageTime(msg.createdAt) !== formatMessageTime(messagesDummyData[index - 1].createdAt)
              ? (
                <p className="text-xs text-gray-400 text-center my-2">
                  {formatMessageTime(msg.createdAt)}
                </p>
              )
              : null
            }

            {/* Message Row */}
            <div
              key={index}
              className={`flex w-full ${msg.senderId === '680f50e4f10f3cd28382ecf9' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="max-w-[250px] rounded-2xl overflow-hidden">
                {msg.image ? (
                  <img
                    src={msg.image}
                    className="rounded-2xl border border-gray-700"
                  />
                ) : (
                  <p
                    className={`p-2 text-white text-sm rounded-2xl break-words ${msg.senderId === '680f50e4f10f3cd28382ecf9'
                        ? 'bg-violet-500/30 rounded-br-none'
                        : 'bg-gray-700/40 rounded-bl-none'
                      }`}
                  >
                    {msg.text}
                  </p>
                )}
              </div>
            </div>
          </>
        ))}

        <div ref={scrollEnd}></div>
      </div>

      {/*Bottom Area of Chat  */}
      <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3'>
        <div className='flex-1 flex items-center bg-gray-100/12 px-3 rounded-full'>
          <input type="text" placeholder='Kahiye kya baat hai.....' className='flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400' />
          <input type="file" id='image' accept='image/png , image/jpeg' hidden />
          <label htmlFor="image">
            <img src={assets.gallery_icon} alt="" className='w-5 mr-2 cursor-pointer' />
          </label>
        </div>
        <img src={assets.send_button} alt="" className='w-7 cursor-pointer' />
      </div>
    </div>
  ) : (
    <div className='h-screen w-full flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden transform -translate-y-25'>
      <img src={'/chat-svgrepo-com.svg'} alt="" className='w-[45%] max-w-[300px]' />
      <p className='text-lg font-bold text-shadow-indigo-50'>APNE PASANDIDA SHAKS KO CHUNE </p>
    </div>
  )
}

export default ChatContainer
