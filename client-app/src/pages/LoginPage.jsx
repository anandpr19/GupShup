import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { data } from 'react-router-dom'
import { AuthContext } from '../../context/useAuth'

const LoginPage = () => {

  const [currState, setcurrState] = useState("Panji Karan Karein")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [dataSubmitted, setDataSubmitted] = useState(false)

  const { login } =useContext(AuthContext)
  
  const onSubmitHandler = (event)=>{
    event.preventDefault();

    if(currState ==="Panji Karan Karein" && !dataSubmitted){
      setDataSubmitted(true);
      return;
    }

    login(currState==="Panji Karan Karein" ? 'signup': 'login',{fullName,email,password, bio})
  }

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>

      <img src={'./chat-svgrepo-com.svg'} alt="" className='w-[min(30vw,250px)]' />

      <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>

        <h2 className='font-medium text-2xl flex justify-between items-center'>
          {currState}
          {dataSubmitted && <img onClick={() => { setDataSubmitted(false) }} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' />}
        </h2>


        {currState === "Panji Karan Karein" && !dataSubmitted && (
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            className='p-2 border border-gray-500 rounded-md focus:outline-none'
            placeholder='Poora Naam DARJ karein'
            required
          />
        )}

        {!dataSubmitted && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder='APNA E-MAIL DARJ KAREIN'
              required
              className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />

            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder='Yeh Baatein bas Aap jaane'
              required
              className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
          </>
        )}

        {currState === "Panji Karan Karein" && dataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
            placeholder='Apne Baare mein Kuch Bataaiye'
            required
          />
        )}

        <button type='submit' className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'>
          {currState === "Panji Karan Karein" ? "Khaata Banaayein" : "Pravesh Karein"}
        </button>

        <div className='flex items-center gap-2 text-sm text-gray-500'>
          <input type="checkbox" />
          <p>Suraksha Adhiniyamon ko Sweekar Karein</p>
        </div>

        <div className='flex flex-col gap-2'>
          {currState === "Panji Karan Karein" ? (
            <p className='text-sm text-gray-600'>
              Pehle se Khata Bana hua hai?
              <span onClick={() => { setcurrState("Pravesh Karein"); setDataSubmitted(false) }}
                className='font-medium text-violet-500 cursor-pointer'>
                Pravesh Karein
              </span>
            </p>
          ) : (
            <p className='text-sm text-gray-600'>
              Naya Khaata Kholein
              <span onClick={() => { setcurrState("Panji Karan Karein") }}
                className='font-medium text-violet-500 cursor-pointer'>
                Yaha Click Karein
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  )
}

export default LoginPage
