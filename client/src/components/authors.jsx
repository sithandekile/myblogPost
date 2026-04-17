import React, { useState, useEffect } from 'react';
import { authService } from '../services/api';

export default function Authors() {
  const [users, setUser] = useState([]);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const data = await authService.getUsers();
      setUser(data.slice(0, 4));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">

      <h1 className="text-center font-bold text-3xl text-gray-800 mb-10">
        Authors In The House
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {users.map((author, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg text-center"
          >
            {/* Avatar */}
            <div className="w-16 h-16 mx-auto rounded-full bg-orange-200 flex items-center justify-center text-white font-bold text-lg">
              {author.email?.charAt(0).toUpperCase()}
            </div>

            <p className="mt-4 text-sm text-gray-500">
              {author.email}
            </p>

            <p className="text-gray-700 font-medium">
              {author.profession || "Writer"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}