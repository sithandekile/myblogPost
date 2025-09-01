import React from 'react'
import logo from '../assets/react.svg'
import {Link} from 'react-router-dom'

export default function Footer() {
  const [email,setEmail]=('')
  return (
    <div className='bg-sky-800 text-white text-center py-10 px-2'>
      <div className='w-[60%] mx-auto'>
      <div className='flex justify-between items-center'>
      <img src={logo} alt='footer logo'/>
      <div className='flex gap-10'>
      < Link to='/blog'>Blog</Link>
     < Link to='/contact'>AboutUs</Link>
     < Link to='/contact'>ContactUs</Link>
     < Link to='/subscribe'>PrivacyPolicy</Link>
      </div>
      </div>
      <div className='bg-white/10 py-4 my-4'>
      <p>Subscribe to our news letter to get latest updates
        <span><input type='email'
        value={email}
         onChange={(e)=>setEmail(e.target.value)}
         placeholder='Enter your Email' className='w- mx-10 border border-white/20 p-2 rounded-lg'/>< Link to='/subscribe'className='bg-orange-700 p-2 rounded-sm'>Subscribe</Link></span></p>
       </div>
      </div>
      <div>
        
      </div>
    </div>
  )
}
