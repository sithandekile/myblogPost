import React from 'react'
import Image from '../assets/react.svg'
import{Link} from 'react-router-dom'
export default function Navbar() {
  return (
    <div className='flex justify-between bg-sky-800 backdrop-blur-lg sticky top-0 left-0 right-0 p-4 z-10'>
      <div>
        <img src={Image} alt='logo'/>
      </div>
      <div className=' flex gap-10 text-white hover-texx-orange-500'>
     < Link to='/'>Home</Link>
     < Link to='/blog'>Blog</Link>
     < Link to='/contact'>ContactUs</Link>
     < Link to='/subscribe'>Subscribe</Link>
    </div>
    </div>
  )
}
