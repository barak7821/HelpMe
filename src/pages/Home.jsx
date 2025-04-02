import React, { useContext, useEffect } from 'react'
import { AppContext } from '../utils/AppContext'
import { Link, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'

export default function Home() {
  const nav = useNavigate()
  const { userName, userService } = useContext(AppContext)

  useEffect(() => {
    if (!userName) {
      nav("/")
    }
  }, [userName, nav])

  return (
    <div className='bg-gray-200  min-h-screen'>
      <NavBar />
      <div className='flex flex-col justify-center items-center min-h-screen'>
        <Link to={`/service/${userService}`} className='text-8xl bg-red-500 text-white p-15 py-30 rounded-2xl font-bold active:scale-95 duration-150'>Help!</Link>
      </div>
    </div>
  )
}