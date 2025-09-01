import React from 'react'
import Mission from './mission'
export default function CreativeTeam() {
  return (
    <div>
  <div className='grid grid-cols-2 gap-4 items-center my-20'>
 <Mission heading='Celebrating the Creative Minds Shaping Our Collaborative Vision' title='Meet the Visionaries Behind Our Creative Journey' desc='Our team is a vibrant collective of passionate writers, thinkers, and creators dedicated to sharing knowledge and sparking inspiration. United by curiosity and a love for storytelling. '/>  
<div>
  <img src='https://images.pexels.com/photos/1116302/pexels-photo-1116302.jpeg' alt="..." className="hero-image" style={{ height: '35vh', width: '100%', objectFit: 'cover' }} />
  </div> 
<div>
  <img src='https://images.pexels.com/photos/1116302/pexels-photo-1116302.jpeg' alt="..." className="hero-image" style={{ height: '35vh', width: '100%', objectFit: 'cover' }} />
  </div> 
  <Mission heading='Fueling Growth and Connection Through Shared Stories' title='The Inspiration and Purpose Driving Our Blog Forward' desc='Our blog is a living testament to the power of collaboration and curiosity. We strive to cultivate an environment where every voice matters and every experience adds value.'/>  
</div>
    </div>
  )
}
