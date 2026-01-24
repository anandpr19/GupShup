import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import { Toaster } from "react-hot-toast"
import { useContext } from "react"
import { AuthContext } from '../context/useAuth'

const App = () => {
  const { authUser } = useContext(AuthContext) // because the checkAuth() is already updating the authUser state such that is this state is true, we know the user is already authenticated
  return (
    <div className="bg-[url(./src/assets/bgImage.svg)] bg-contain">
      <Toaster />
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App
