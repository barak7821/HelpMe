import React, { useContext, useEffect, useState } from 'react'
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../utils/AppContext';

export default function Register() {
  const nav = useNavigate()
  const [isPassVisible, setIsPassVisible] = useState(false)
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [errors, setErrors] = useState({ name: "", password: "" })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { userName, loginUser } = useContext(AppContext)

  useEffect(() => {
    if (userName) {
      nav(`/user/${userName}`)
      return
    }
    setIsLoading(false)
  }, [userName, nav])

  useEffect(() => {
    if (!name || !password || isSubmitted) return

    const newErrors = { name: "", password: "" }
    const hasNumbers = /\d/.test(name)
    const hasChar = /[a-zA-Z]/.test(password)
    const hasDigit = /\d/.test(password)

    if (name.length < 4 || hasNumbers) {
      newErrors.name = "Name must be at least 4 characters and contain only letters"
    }

    if (password.length < 8 || !hasChar || !hasDigit) {
      newErrors.password = "Password must be at least 8 characters and include letters and numbers"
    }

    setErrors(newErrors)

    if (!isSubmitted && !newErrors.name && !newErrors.password) {
      console.log("Form is valid")
      setIsSubmitted(true)
      loginUser(name, password)
      nav(`/user/${name}`)
    }
  }, [name, password, isSubmitted, nav, userName, loginUser])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    )
  }

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center px-4 select-none">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl text-center mb-2">Registration</h1>
        <p className="text-gray-500 text-center mb-6">Please fill the fields</p>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-xl mb-1">Full Name:</label>
            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
            <input onChange={(e) => setName(e.target.value)} className="border border-gray-300 rounded-xl bg-gray-100 p-2 w-full" type="text" placeholder="Enter your full name" value={name} required />
          </div>
          <div className="flex flex-col">
            <label className="text-xl mb-1">Password:</label>
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
            <div className="relative">
              <input onChange={(e) => setPassword(e.target.value)} className="border border-gray-300 rounded-xl bg-gray-100 p-2 w-full pr-10" type={isPassVisible ? "text" : "password"} placeholder="Enter your password" value={password} />
              <button onClick={() => setIsPassVisible(prev => !prev)} type="button" className="absolute top-1/2 right-3 transform -translate-y-1/2">
                {isPassVisible ? <LuEyeClosed className="text-gray-400 hover:text-black duration-150" /> : <LuEye className="text-gray-400 hover:text-black duration-150" />}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}