import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from '../services/api';

export const Register = () => {
  const[error,setError]=useState('')
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate=useNavigate()

  //function for handling the form submittion
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password) {
      setError("Form fields cannot be empty");
      return;
    }
     try{
    await authService.register({
    username: form.username,
    email: form.email,
    password: form.password,
});
    navigate('/blog');
  }catch (err) {
      setError('login failed. Please try again.');
    }
  };


  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Create Account
        </h2>
         {error && <p className="text-red-500 mb-4">{error}</p>}


        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Username
          </label>
          <input
            type="text"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            placeholder="Enter username"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full p-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition"
        >
          Register
        </button>

        {/* Redirect */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
};
