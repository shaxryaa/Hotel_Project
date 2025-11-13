import React from "react";
import ServicesCarousel from "@/components/ServicesCarousel";
import FaqAccordion from '@/components/FaqAccordion';

const services = () => {
  return (
    <div>
      <section className="relative h-[80vh] w-full bg-cover bg-center" style={{ backgroundImage: "url('/servicesimg1.jpg')" }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex h-full items-center px-8 md:px-16">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">Services Designed for Your Success</h1>
          </div>
        </div>
      </section>
      <ServicesCarousel/>
      <FaqAccordion/>
    </div>
  );
};
export default services;