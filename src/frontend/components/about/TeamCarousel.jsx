"use client";
import React from "react";

const teamMembers = [
  {
    name: "Shaurya Sharma",
    role: "Founder & CEO",
    bio: "Shaurya leads our vision and product design with creativity and determination.",
    image: "/founder.jpeg",
  },
  {
    name: "Aryan Verma",
    role: "CTO",
    bio: "Aryan architects our platform and manages all tech-related decisions.",
    image: "/cto.webp",
  },
  {
    name: "Benny Grover",
    role: "Lead Developer",
    bio: "Benny develops core features and ensures code quality across the stack.",
    image: "/leaddev.jpg",
  },
  {
    name: "Priya Desai",
    role: "Marketing Head",
    bio: "Priya builds our brand identity and drives digital marketing strategies.",
    image: "/marketinghead.webp",
  },
];

const TeamCarousel = () => {
  return (
    <section className="py-16 bg-white">
      <h2 className="text-4xl font-bold text-center text-blue-700 mb-12">Meet the Team</h2>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex space-x-10 px-6 md:px-50 w-max">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="w-64 flex-shrink-0 bg-gray-50 shadow-lg rounded-lg p-6 text-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-blue-600 font-medium">{member.role}</p>
              <p className="text-gray-600 mt-2 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamCarousel;