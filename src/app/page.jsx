import React from 'react'
import Hero from "@/frontend/components/home/Hero";
import FeaturedCarousel from "@/frontend/components/home/FeaturedCarousel";
import SellingPoints from "@/frontend/components/home/SellingPoints";
import TestimonialCarousel from "@/frontend/components/home/TestimonialCarousel";
import PopularDestinationsCarousel from "@/frontend/components/home/PopularDestinationsCarousel";

const Homepage = () => {
  return (
    <main>
      <Hero />
      <PopularDestinationsCarousel />
      <FeaturedCarousel />
      <SellingPoints />
      <TestimonialCarousel />
    </main>
  )
}

export default Homepage