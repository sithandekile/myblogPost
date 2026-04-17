import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const Login = () => {
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    email: "",
    password: ""
  })
  const {login} = useAuth(); // login function from context
  const navigate = useNavigate()

  //function for handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError('Fill all required fields');
      return;
    }
    const formData={
      email:form.email,
      password:form.password
    }

    try {
      await login(formData); 
      navigate('/blog');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
      console.error('Login error details:', err);
    }
  }

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-50">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
          <input 
            type="email" 
            value={form.email} 
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="example@gmail.com" 
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
          <input 
            type="password" 
            value={form.password} 
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Enter password" 
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Button */}
        <button 
          type="submit"
          className="w-full p-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition"
        >
          Login
        </button>

        {/* Redirect Text */}
        <p className="text-center text-sm text-gray-600">
          Don’t have an account yet?{" "}
          <Link to="/register" className="text-orange-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </section>
  )
}
