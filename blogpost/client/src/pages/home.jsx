import React from 'react'
import Hero from '../components/hero'
import CreativeTeam from '../components/creativeTeam'
import Authors from '../components/authors'

export default function Home() {
  return (
    <div>
      <Hero/>
      <CreativeTeam/>
      <Authors/>
      <div className='text-center my-20'>
      <h1>Join Our Team to be The part of The Story</h1>
      <p className='text-gray-700 mt-2'>
   Be part of a passionate community that values creativity, growth, and collaboration.<br />
    Together, we’re building something impactful — where your ideas matter,<br />
    your skills grow, and your journey truly begins.<br />
    Take the next step and create your story with us today.
  </p>
      <button className='bg-orange-600 text-white p-2 rounded-sm  mt-4'>Join Now</button>
     </div>
    </div>
  )
}
