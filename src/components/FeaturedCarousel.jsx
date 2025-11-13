'use client';
import React, { useState } from "react";

const featuredItems = [
  {
    id: 1,
    title: "Deluxe Suite",
    location: "Bandra West, Mumbai",
    beds: 4,
    baths: 3,
    sqft: 2500,
    price: 4350,
    rating: 4.8,
    image: "/hotelimage1.jpg",
  },
  {
    id: 2,
    title: "Luxury Villa",
    location: "Satellite, Ahmedabad",
    beds: 5,
    baths: 4,
    sqft: 3500,
    price: 5200,
    rating: 4.7,
    image: "/hotelimage2.webp",
  },
  {
    id: 3,
    title: "Beachfront Villa",
    location: "Candolim Beach, Goa",
    beds: 4,
    baths: 4,
    sqft: 4500,
    price: 6100,
    rating: 4.9,
    image: "/hotelimage3.jpg",
  },
  {
    id: 4,
    title: "Modern Apartment",
    location: "Bandra West, Mumbai",
    beds: 3,
    baths: 2,
    sqft: 1500,
    price: 3750,
    rating: 4.6,
    image: "/hotelimage4.webp",
  },
  {
    id: 5,
    title: "Countryside House",
    location: "Ooty, Tamil Nadu",
    beds: 4,
    baths: 3,
    sqft: 3200,
    price: 4100,
    rating: 4.7,
    image: "/hotelimage5.jpeg",
  },
  {
    id: 6,
    title: "Cozy House",
    location: "Old Manali, Himachal Pradesh",
    beds: 3,
    baths: 3,
    sqft: 3500,
    price: 3900,
    rating: 4.8,
    image: "/hotelimage6.webp",
  },
  {
    id: 7,
    title: "Royal Heritage Hotel",
    location: "Rajpath, Jaipur",
    beds: 4,
    baths: 3,
    sqft: 4000,
    price: 5000,
    rating: 4.6,
    image: "/hotelimage7.jpg",
  },
  {
    id: 8,
    title: "City Central Hotel",
    location: "Connaught Place, Delhi",
    beds: 3,
    baths: 2,
    sqft: 2500,
    price: 3000,
    rating: 4.6,
    image: "/hotelimage8.jpg",
  },
  {
    id: 9,
    title: "Mountain Escape",
    location: "Shimla Hills",
    beds: 3,
    baths: 2,
    sqft: 3000,
    price: 5000,
    rating: 4.8,
    image: "/hotelimage9.jpg",
  },
];


const StarIcon = () => (
  <svg className="h-4 w-4 text-orange-500 mr-1 inline" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.049 9.397c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.97z"/>
  </svg>
);

const FeaturedCarousel = () => {
  const [liked, setLiked] = useState({});

  const toggleLike = (id) => {
    setLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Featured Hotels</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth">
          {featuredItems.map((item) => (
            <div
              key={item.id}
              className="min-w-[300px] max-w-sm bg-white rounded-xl shadow-lg overflow-hidden relative group"
            >
              <button
                className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors"
                onClick={() => toggleLike(item.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${liked[item.id] ? "text-red-500" : "text-gray-400"}`}
                  fill={liked[item.id] ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {item.location}
                </p>
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    {item.beds} Beds
                  </span>
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {item.baths} Baths
                  </span>
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    {item.sqft} sqft
                  </span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="flex items-center text-orange-500 font-medium text-base">
                    <StarIcon /> {item.rating}
                  </span>
                  <span className="text-lg font-bold text-gray-800">
                    ₹{item.price}/<span className="text-gray-400 text-base">night</span>
                  </span>
                </div>
                <button className="w-full py-3 bg-gray-100 text-lg text-gray-800 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCarousel;