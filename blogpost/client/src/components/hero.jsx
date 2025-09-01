import React from 'react'
import Mission from './mission'

export default function Hero() {
  return (
    <div >
      <div className='flex  justify-between '>
        <div className='bg-white/20 backdrop-blur-lg shadow-lg relative top-10 z-1'>
      <h3>About Us</h3>
      <h1 className='text-black text-3xl'>We are a team of content writters who share their learning</h1>
      </div>
      <p>Welcome to a space where ideas ignite and stories unfold.
Dive into insightful articles crafted to inspire and inform.
Discover perspectives that challenge the ordinary and spark curiosity.
Join a community passionate about learning, sharing, and growing together.
Your next big inspiration starts right here—explore, connect, and create.</p>
      </div>
    <div>
    <img src='https://images.pexels.com/photos/3869651/pexels-photo-3869651.jpeg' alt="..." className="hero-image" style={{ height: '45vh', width: '100%', objectFit: 'cover' }} />
    <div className='flex justify-between items-center gap-4 bg-orange-100 px-10'>
  <Mission heading='mission' title='Empowering Minds to Create, Connect,and Learn' desc='Our mission is to ignite curiosity and foster creativity by sharing diverse stories and experiences. We believe in the transformative power of knowledge and collaboration, striving to build a welcoming space where everyone can learn, grow, and inspire one another. '/>   
<Mission heading='mission' title='Inspiring Growth Through Shared Wisdom' desc='We are dedicated to building a community where collaboration and shared wisdom drive personal and collective growth. By connecting passionate individuals and encouraging open dialogue, we create opportunities for learning, support, and inspiration.'/>  
</div> 
</div>
</div>
  )
}
