"use client";
import React from 'react'
const Hero = () => {
  return (
    <section
      className="w-full h-screen bg-cover bg-center flex items-center justify-center mt-[-76px]"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')",
      }}
    >
      <div className="w-full h-full flex items-center justify-center px-6 bg-gradient-to-r from-black/50 to-transparent">
        <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between text-white gap-10 pt-16">
          
          <div className="md:w-1/2 text-center md:text-left md:pl-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
              Discover Your Perfect Stay with StayKaro
            </h1>
            <p className="text-xl mb-6 md:max-w-md drop-shadow-md">
              Easy bookings, cozy stays, and unforgettable experiences awaiting you.
            </p>
            <div className="flex justify-center md:justify-start">
              <a 
                href="/services" 
                className="group bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg mt-4"
              >
                Explore More
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="md:w-1/2">
            {/* Right side empty space */}
          </div>

        </div>
      </div>
    </section>
  )
}
export default Hero