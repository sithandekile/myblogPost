import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-sky-900 text-white py-12">

      <div className="max-w-7xl mx-auto px-4">

        {/* Top */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          <h2 className="text-2xl font-bold">Your Blog Platform</h2>
          <div className="flex gap-6 text-sm">
            <Link className="hover:text-orange-600 transition"to="/blog">Blog</Link>
            <Link className="hover:text-orange-600 transition" to="/about">About Us</Link>
            <Link className="hover:text-orange-600 transition" to="/contact">Contact</Link>
            <Link className="hover:text-orange-600 transition" to="/subscribe">Privacy</Link>
          </div>
        </div>

        {/* Subscribe */}
        <div className="mt-10 bg-white/10 p-6 rounded-xl text-center">
          <p className="mb-4">
            Subscribe to our newsletter to get latest updates
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-4 py-2 rounded-lg text-black w-full md:w-80"
            />

            <button className="bg-orange-500 px-6 py-2 rounded-lg hover:bg-orange-600 transition">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom */}
        <p className="text-center text-sm text-gray-300 mt-8">
          © {new Date().getFullYear()} Your Blog Platform. All rights reserved.
        </p>

      </div>
    </footer>
  );
}