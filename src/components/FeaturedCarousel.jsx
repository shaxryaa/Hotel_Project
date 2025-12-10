'use client';
import React from "react";
import Link from "next/link";
import { featuredHotels } from "@/data/hotels";
import { useFavorites } from "@/hooks/useFavorites";

const StarIcon = () => (
  <svg className="h-4 w-4 text-orange-500 mr-1 inline" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.049 9.397c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.97z"/>
  </svg>
);

const FeaturedCarousel = () => {

  const { isFavorite, toggleFavorite } = useFavorites();
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Featured Hotels</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth">
          {featuredHotels.map((item) => (
            <div
              key={item.id}
              className="min-w-[300px] max-w-sm bg-white rounded-xl shadow-lg overflow-hidden relative group"
            >
              <button
                className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors"
                onClick={() => toggleFavorite(item.id)}
                aria-label={isFavorite(item.id) ? "Remove from favourites" : "Add to favourites"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${isFavorite(item.id) ? "text-red-500" : "text-gray-400"}`}
                  fill={isFavorite(item.id) ? "currentColor" : "none"}
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
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-gray-500 text-sm">{item.location}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 7a2 2 0 012-2h12a2 2 0 012 2M3 7v10a2 2 0 002 2h12a2 2 0 002-2V7m-5 4h.01M12 11h.01M9 11h.01" />
                    </svg>
                    {item.beds} beds
                  </span>
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 21v-8a2 2 0 012-2h12a2 2 0 012 2v8" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 21V9a3 3 0 016 0v12" />
                    </svg>
                    {item.baths} baths
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
                    <span className="text-gray-500 text-xs ml-1">({item.ratingCount})</span>
                  </span>
                  <span className="text-lg font-bold text-gray-800">
                    ₹{item.price}/<span className="text-gray-400 text-base">night</span>
                  </span>
                </div>
                <Link
                  href={`/hotels/${item.id}`}
                  className="w-full inline-flex justify-center py-3 bg-gray-100 text-lg text-gray-800 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Link
            href="/hotels"
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            See more hotels
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCarousel;