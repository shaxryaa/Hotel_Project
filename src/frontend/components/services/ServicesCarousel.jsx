'use client'
import React from 'react'
import { useState } from 'react';   

const services = [
  {
    id: 1,
    name: 'Luxury Suite',
    description:
      'Indulge in our premium luxury suites with breathtaking views, king-sized beds, and exceptional room service.',
    image: '/luxury-suite.jpg',
  },
  {
    id: 2,
    name: 'Infinity Pool',
    description:
      'Relax and rejuvenate in our rooftop infinity pool, offering a serene atmosphere and city skyline views.',
    image: '/infinity-pool.jpg',
  },
  {
    id: 3,
    name: 'Private Beach Access',
    description:
      'Enjoy exclusive access to our pristine private beach, with sunbeds, refreshments, and beachside service.',
    image: '/private-beach.jpg',
  },
  {
    id: 4,
    name: 'Spa & Wellness',
    description:
      'Experience world-class spa treatments, massage therapies, and wellness programs tailored for you.',
    image: '/spa.jpg',
  },
  {
    id: 5,
    name: 'Gourmet Dining',
    description:
      'Savor culinary excellence with our 5-star gourmet dining experience, curated by top chefs.',
    image: '/dining.jpg',
  },
];
const ServicesCarousel = () => {
    const [selected, setSelected] = useState(services[0]);
    return (
        <div className="w-full px-6 py-14 bg-white">
        <h2 className="text-4xl font-bold text-center mb-10">Our Premium Services</h2>

        {/* Horizontal Scroll Cards */}
        <div className="overflow-x-auto flex gap-6 pb-6 scrollbar-hide">
            {services.map((service) => (
            <div
                key={service.id}
                onClick={() => setSelected(service)}
                className={`min-w-[250px] rounded-xl p-4 bg-gray-100 shadow-md cursor-pointer transition-transform hover:scale-105 ${
                selected.id === service.id ? 'border-2 border-blue-600' : ''
                }`}
            >
                <img
                src={service.image}
                alt={service.name}
                className="h-40 w-full object-cover rounded-md"
                />
                <h3 className="mt-3 text-lg font-semibold">{service.name}</h3>
            </div>
            ))}
        </div>

        {/* Description Section */}
        <div className="mt-12 flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
            <img
                src={selected.image}
                alt={selected.name}
                className="w-full rounded-lg shadow-lg"
            />
            </div>
            <div className="md:w-1/2">
            <h3 className="text-2xl font-bold mb-4">{selected.name}</h3>
            <p className="text-gray-700 text-lg">{selected.description}</p>
            </div>
        </div>
        </div>
    )
}

export default ServicesCarousel;