import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

export const SignUp=() =>{
  const[error,setError]=useState('')
  const[form,setForm]=useState({
    username:"",
    email:"",
    password:"",
    verifyPassword:""
  })
  const navigate=useNavigate();

  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setError('')
    if(!form.username || !form.email || !form.password || !form.verifyPassword){
      setError('Fill up required fields')
      return
    }
    if(form.password!==form.verifyPassword){
      setError('password does not match')
      return
    }
    try{
   await axios.post('http://localhost:8080/api/users/register',form)
   navigate('/login')
    }catch(error){
    setError('failed to register') 
    }
    setForm('')
  }


  return (
      <main className='max-w-lg mx-auto shadow-lg rounded-lg my-20 '>
       <form onSubmit={handleSubmit}className='p-4'>
        <h1 className='font-extrabold text-center text-3xl'>Create You Account With Us!</h1>
        <div className='flex flex-col mt-10 items-center '>
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        <input type='text' name='username'value={form.username} onChange={handleChange}placeholder='Enter your username' className='p-2 border border-gray-200 rounded-lg mb-5 w-full' />
        <input type='email' name='email' value={form.email} onChange={handleChange}placeholder='hope@gmail.com'className='p-2 border border-gray-200 rounded-lg mb-5 w-full'/>
        <input type='password' name='password' value={form.password} onChange={handleChange}placeholder='Enter your password'className='p-2 border border-gray-200 rounded-lg mb-5 w-full'/>
        <input type='password'name='verifyPassword' value={form.verifyPassword} onChange={handleChange}placeholder='Verify password'className='p-2 border border-gray-200 rounded-lg mb-5 w-full '/>
        <button type='submit' className='bg-pink-500/100 text-white p-2 w-full rounded cursor-pointer hover:bg-pink-300'>Register</button>
        </div>
        </form>
      </main>
  )
}
