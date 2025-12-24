"use client";
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const destinations = [
  {
    city: "London",
    country: "United Kingdom",
    image: "/london.jpeg",
  },
  {
    city: "Manali",
    country: "India",
    image: "/manali.jpg",
  },
  {
    city: "Chandigarh",
    country: "India",
    image: "/chandigarh.webp",
  },
  {
    city: "Alwar",
    country: "India",
    image: "/alwar.jpeg",
  },
  {
    city: "Varanasi",
    country: "India",
    image: "/varanasi.jpeg",
  },
  {
    city: "Goa",
    country: "India",
    image: "/goa.jpg",
  },
  {
    city: "Bangalore",
    country: "India",
    image: "/bangalore.jpg",
  },
];

const PopularDestinationsCarousel = () => {
  const scrollRef = React.useRef();

  const scroll = (offset) => {
    scrollRef.current.scrollLeft += offset;
  };

  return (
    <div className="py-10 px-4">
      <h2 className="text-4xl font-semibold text-center mb-6">Popular Destinations</h2>
      <div className="relative">
        <button
          onClick={() => scroll(-300)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow-md rounded-full"
        >
          <ChevronLeft />
        </button>
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth px-10"
        >
          {destinations.map((dest, index) => (
            <div
              key={index}
              className="min-w-[250px] bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <img
                src={dest.image}
                alt={dest.city}
                className="w-full h-48 object-cover"
              />
              <div className="p-3">
                <h3 className="font-semibold text-lg">{dest.city}</h3>
                <p className="text-sm text-gray-600">{dest.country}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll(300)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow-md rounded-full"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default PopularDestinationsCarousel;
