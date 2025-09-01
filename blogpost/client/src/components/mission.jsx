import React from 'react'

export default function Mission({img,heading,title,desc,className})
{
  return (
    <div className=' border border-white/20 px-20 text-center  rounded-lg'>
      <img src={img} className={className}  />
      <h3 className='font-black text-[#333]'>{heading}</h3>
      <h1 className='font-bold text-[#5E5E5E]'>{title}</h1>
      <p>{desc}</p>

      {/* <p>{links}</p> */}
    </div>
  )
}
