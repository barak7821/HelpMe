import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { AppContext } from '../utils/AppContext'
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

export default function Service() {
  const nav = useNavigate()
  const { userName, userService, userPassword } = useContext(AppContext)
  const [service, setService] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isPassVisible, setIsPassVisible] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isConfirmVisible, setIsConfirmVisible] = useState(false)
  const [errors, setErrors] = useState("")
  const [failedAttempts, setFailedAttempts] = useState(0)

  useEffect(() => {
    if (userService === "100") {
      setService("משטרת ישראל 100")
    }
    if (userService === "101") {
      setService("מגן דוד אדום 101")
    }
    if (userService === "102") {
      setService("כיבוי והצלה 102")
    }
  }, [userService])

  const handleClick = () => {
    let newErrors = ""

    if (password !== confirmPassword) {
      newErrors = "Passwords do not match"
      setPassword("")
      setConfirmPassword("")
    } else if (password !== userPassword) {
      const newFailedAttempts = failedAttempts + 1
      setFailedAttempts(newFailedAttempts)
      if (newFailedAttempts >= 3) {
        setIsOpen(false)
        return
      }
      newErrors = "Password is incorrect"
      setPassword("")
      setConfirmPassword("")
    }

    if (newErrors) {
      setErrors(newErrors)
      return
    }

    setErrors("")
    setPassword("")
    setConfirmPassword("")
    setFailedAttempts(0)
    setIsOpen(false)
    nav(`/user/${userName}`)
  }

  return (
    <div className='relative bg-gray-200 min-h-screen flex flex-col'>
      <NavBar />
      <div className='flex flex-col items-center rounded-2xl bg-blue-200 m-10 py-5 text-4xl font-bold gap-10'>
        <h1>{service}</h1>
        <h1>{userName}</h1>
      </div>
      <div className='flex justify-center mt-auto pb-8'>
        <button disabled={failedAttempts >= 3} onClick={() => setIsOpen(prev => !prev)} className={`text-white font-bold p-4 text-2xl rounded
    ${failedAttempts >= 3 ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-500 active:scale-95 duration-150"}`}>
          Cancel
        </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-blue-200/80 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-10 rounded-2xl shadow-xl text-center w-80 flex flex-col gap-6 relative">
            <div className="flex justify-between items-center mb-2">

              <button onClick={() => setIsOpen(false)} className="absolute top-2 right-2 text-gray-400 hover:text-black">
                < IoIosClose size={40} />
              </button>
            </div>

            <h1 className="text-4xl">Password</h1>

            {errors && <span className="text-red-500 text-sm">{errors}</span>}


            <div className="relative w-full">
              <input onChange={(e) => setPassword(e.target.value)} className="border border-gray-300 rounded-xl bg-gray-100 p-2 w-full pr-10 focus:outline-none"
                type={isPassVisible ? "text" : "password"} placeholder="Enter your password" value={password} />

              <button onClick={() => setIsPassVisible(prev => !prev)} type="button" className="absolute top-1/2 right-3 transform -translate-y-1/2">
                {isPassVisible ? <LuEyeClosed className="text-gray-400 hover:text-black duration-150" /> : <LuEye className="text-gray-400 hover:text-black duration-150" />}
              </button>
            </div>
            <div className="relative w-full">
              <input onChange={(e) => setConfirmPassword(e.target.value)} className="border border-gray-300 rounded-xl bg-gray-100 p-2 w-full pr-10 focus:outline-none"
                type={isConfirmVisible ? "text" : "password"} placeholder="Confirm your password" value={confirmPassword} />

              <button onClick={() => setIsConfirmVisible(prev => !prev)} type="button" className="absolute top-1/2 right-3 transform -translate-y-1/2">
                {isConfirmVisible ? <LuEyeClosed className="text-gray-400 hover:text-black duration-150" /> : <LuEye className="text-gray-400 hover:text-black duration-150" />}
              </button>
            </div>
            <button onClick={handleClick} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 text-xl rounded active:scale-95 duration-150" type='button'>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}
