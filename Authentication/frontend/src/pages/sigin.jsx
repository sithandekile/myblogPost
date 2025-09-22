import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const SignIn=() =>{
  const[error,setError]=useState('')
  const[form,setForm]=useState({
  email:"" ,
  password:"" 
  })
  const navigate=useNavigate()
  const handleChange=(e)=>{
  setForm({...form,[e.target.name]:e.target.value})
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setError('')
    if(!form.email || !form.password){
      setError('Fill required fields')
    return
      }
    try {
     const res= await axios.post('http://localhost:8080/api/users/login',form)
     if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }

      // if login is successfull redirect to  dashboard
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to login');
    }
    setForm('')
  }
  return (
    <main className='max-w-lg mx-auto shadow-lg rounded-lg my-20 '>
           <form onSubmit={handleSubmit}className='p-4'>
            <h1 className='font-extrabold text-center text-5xl'>Welcome Back!</h1>
            <div className='flex flex-col mt-10 items-center '>
            {error && <p className='text-red-500 mb-4'>{error}</p>}
            <input type='email' name='email'value={form.email} onChange={handleChange}placeholder='hope@gmail.com'className='p-2 border border-gray-200 rounded-lg mb-5 w-full'/>
            <input type='password' name='password' value={form.password} onChange={handleChange}placeholder='Enter your password'className='p-2 border border-gray-200 rounded-lg mb-5 w-full'/>
            <button type='submit' className='bg-pink-500/100 text-white p-2 w-full rounded cursor-pointer hover:bg-pink-300'>Login</button>
            </div>
            </form>
          </main>
  )
}
