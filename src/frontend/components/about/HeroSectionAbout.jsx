import React from "react";
import Image from "next/image";

const HeroSectionAbout = () => {
  return (
    <div className="relative h-[90vh] w-full">
      <Image
        src="/about-bg.jpg" 
        alt="About Background"
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <div className="absolute inset-0 flex items-center justify-start px-10 z-20">
        <div className="text-white max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover Our Journey and Vision
          </h1>
          <p className="text-lg">
            We strive to provide seamless hotel experiences that blend comfort, affordability, and luxury.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionAbout;