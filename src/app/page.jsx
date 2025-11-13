import React from 'react'
import Hero from "@/components/Hero";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import SellingPoints from "@/components/SellingPoints";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import PopularDestinationsCarousel from "@/components/PopularDestinationsCarousel";

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