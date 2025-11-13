"use client";
import React from 'react'
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="w-full bg-gray-50 py-6 px-4 shadow-sm">
      <div className="max-w-3xl mx-auto relative">
        <input
          type="text"
          placeholder="Search for hotels"
          className="w-full border border-gray-300 rounded-full px-5 py-3 pr-12 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 hover:text-blue-600">
          <Search size={20} />
        </button>
      </div>
    </div>
  )
}

export default SearchBar