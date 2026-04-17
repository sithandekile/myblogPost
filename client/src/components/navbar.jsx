import React, { useState } from 'react'
import Image from '../assets/react.svg'
import { Link, useNavigate } from 'react-router-dom'
import { LuMenu, LuX } from "react-icons/lu"
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleMenu = () => setMenuOpen(!menuOpen)

  return (
    <nav className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b">
      
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-5">

        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <img src={Image} alt="logo" className="h-9 w-auto" />
          <span className="font-bold text-lg text-gray-800">BlogApp</span>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <li>
            <Link className="hover:text-sky-600 transition" to="/">Home</Link>
          </li>
          <li>
            <Link className="hover:text-sky-600 transition" to="/blog">Blog</Link>
          </li>
          <li>
            <Link className="hover:text-sky-600 transition" to="/contact">Contact</Link>
          </li>
        </ul>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">

          {user ? (
            <>
            <div className="flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-full">
            <span className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center text-white font-bold text-lg">
          {user?.email?.charAt(0)?.toUpperCase() || 'U'}</span>
              <span className="text-sm text-gray-600 truncate max-w-[150px]">
                {user?.username || user?.email || 'User'}
              </span>
              </div>

              <button
                onClick={() => navigate('/create-post')}
                className="bg-sky-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-sky-700 transition"
              >
                Create Post
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="text-gray-700 hover:text-sky-600 transition"
              >
                Login
              </button>

              <button
                onClick={() => navigate('/register')}
                className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-gray-800"
          onClick={handleMenu}
        >
          {menuOpen ? <LuX size={26} /> : <LuMenu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 w-[70%] h-full shadow-lg z-50 transform 
        ${menuOpen ? "translate-x-0" : "translate-x-full"} 
        transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="p-6 pt-16 flex flex-col gap-6 bg-sky-900 text-white">

          <Link onClick={handleMenu} to="/">Home</Link>
          <Link onClick={handleMenu} to="/blog">Blog</Link>
          <Link onClick={handleMenu} to="/contact">Contact</Link>

          <hr />

          {user ? (
            <>
              <span className="text-sm">{user.email}</span>

              <button
                onClick={() => {
                  navigate('/create-post')
                  handleMenu()
                }}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg"
              >
                Create Post
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  navigate('/login')
                  handleMenu()
                }}
              >
                Login
              </button>

              <button
                onClick={() => {
                  navigate('/register')
                  handleMenu()
                }}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}