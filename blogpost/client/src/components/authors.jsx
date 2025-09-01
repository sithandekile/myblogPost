import React from 'react'
import Mission from './mission'
import myPic from '../assets/thande.PNG'
import myPilo from '../assets/pilot.jpg'
import myDes from '../assets/desiner.jpg'
import myProd from '../assets/product.jpg'

export default function Authors() {

  return (
    <>
    <h1 className='text-center font-black text-4xl my-8 text-[#5E5E5E]'>Authors In The House</h1>
      <div className='grid grid-cols-4 gap-4 items-center mt-4 '>
       <Mission img ={myDes}className=" rounded-full w-[100px] h-[100px]" heading='Thande Ndlovu' title='Full Stack Developer'/>
        <Mission img ={myPilo} className=" rounded-full w-[100px] h-[100px]" heading='Thatoe Mpobane' title='Student'/>  
        <Mission img ={myPic} alt="..." className=" rounded-full w-[100px] h-[100px]" heading='Thatoe Mpobane' title='Student'/> 
        <Mission img ={myProd} alt="..." className="rounded-[50%] w-[100px] h-[100px]" heading='Thatoe Mpobane' title='Student' />  
        
      </div>
      </>
  )
}
