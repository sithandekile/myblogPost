import React from 'react';
import { MissionData } from '../data';

export default function Hero() {
  return (
    <div className="w-full">

      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-800 leading-tight">
            We are a team of content writers who share their learning
          </h1>

          <p className="text-gray-500 leading-relaxed">
            Welcome to a space where ideas ignite and stories unfold.
            Discover insights that inspire, challenge, and help you grow.
            Join a community passionate about learning and creativity.
          </p>

          <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition">
            Explore Blog
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div>
          <img
            src="https://images.pexels.com/photos/3869651/pexels-photo-3869651.jpeg"
            alt="hero"
            className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
          />
        </div>
      </div>

      {/* MISSION SECTION */}
      <div className="bg-orange-50 py-12">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
          {MissionData.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <h1 className="text-xl font-semibold text-gray-800">
                {item.heading}
              </h1>
              <p className="text-sm text-gray-500 mt-2">{item.title}</p>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}