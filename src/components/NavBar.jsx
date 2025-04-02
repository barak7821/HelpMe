import React, { useContext, useState } from 'react'
import { IoIosMenu, IoIosClose } from "react-icons/io";
import { AppContext } from '../utils/AppContext';

export default function NavBar() {
    const { updateService, userService } = useContext(AppContext)
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div className="bg-blue-300 p-5 relative">
                <button onClick={() => setIsOpen(prev => !prev)} className="active:scale-90 duration-300 absolute top-4 right-4 z-50">
                    {isOpen ? <IoIosClose size={50} /> : <IoIosMenu size={50} />}
                </button>
                <span className='flex items-center gap-3'>
                    <img src={`/${userService}.svg`} alt="logo" className="w-12 h-12" />
                    <h1 className="text-4xl font-bold">{userService}</h1>
                </span>
            </div>


            {isOpen &&
                <div className='relative'>
                    <nav className='absolute right-0 bg-blue-300 shadow-lg w-36 border border-blue-400 overflow-hidden'>
                        <ul>
                            <li>
                                <button onClick={() => { updateService("100"); setIsOpen(prev => !prev) }} className={`w-full px-6 py-3 hover:bg-blue-400 text-2xl font-bold flex items-center gap-3 ${userService === "100" ? "bg-blue-200 text-white" : "hover:bg-blue-400"}`}>
                                    <img src="/100.svg" alt="logo" className="w-12 h-12" />
                                    100
                                </button>
                            </li>
                            <hr className="w-full border-blue-400" />
                            <li>
                                <button onClick={() => { updateService("101"); setIsOpen(prev => !prev) }} className={`w-full px-6 py-3 hover:bg-blue-400 text-2xl font-bold flex items-center gap-3 ${userService === "101" ? "bg-blue-200 text-white" : "hover:bg-blue-400"}`}>
                                    <img src="/101.svg" alt="logo" className="w-12 h-12" />
                                    101
                                </button>
                            </li>
                            <hr className="w-full border-blue-400" />
                            <li>
                                <button onClick={() => { updateService("102"); setIsOpen(prev => !prev) }} className={`w-full px-6 py-3 hover:bg-blue-400 text-2xl font-bold flex items-center gap-3 ${userService === "102" ? "bg-blue-200 text-white" : "hover:bg-blue-400"}`}>
                                    <img src="/102.svg" alt="logo" className="w-12 h-12" />
                                    102
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div >
            }
        </>
    )
}
