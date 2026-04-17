import React from 'react';
import { Data } from '../data';

export default function CreativeTeam() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">

      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Our Creative Team
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {Data.map((cardItem, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
          >
            <img
              src={cardItem.image}
              alt="team"
              className="w-full h-52 object-cover"
            />

            <div className="p-4 space-y-2">
              <h1 className="text-lg font-semibold text-gray-800">
                {cardItem.heading}
              </h1>
              <p className="text-sm text-gray-500">{cardItem.title}</p>
              <p className="text-gray-600 text-sm">{cardItem.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}