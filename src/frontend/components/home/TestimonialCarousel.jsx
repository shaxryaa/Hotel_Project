'use client';
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const testimonials = [
  {
    name: 'Anshuman Mehta',
    review: 'Booking through StayKaro was smooth and quick. Loved the hotel experience!',
    photo: '/anshumantesti.png'
  },
  {
    name: 'Tanishk Agarwal',
    review: 'Clean UI, easy booking process, and helpful support. Definitely recommend!',
    photo: '/tanishktesti.jpeg',
  },
  {
    name: 'Aman Soni',
    review: 'The best hotel deals I found online! Quick confirmation and no hassle.',
    photo: '/amantesti.jpeg'
  },
  {
    name: 'Kunal Vats',
    review: 'I just love the user-friendly interface of StayKaro. Booking was a breeze!',
    photo: '/kunaltesti.jpeg'
  },

];

const TestimonialsCarousel = () => {
  return (
    <section className="py-16 px-6">
      <h2 className="text-4xl font-bold mb-8 text-center">What Our Customers Say</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        pagination={{ clickable: true }}
        modules={[Pagination]}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col justify-between">
              {testimonial.photo && (
                <img
                  src={testimonial.photo}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                />
              )}
              <p className="text-gray-700 italic text-sm mb-4">“{testimonial.review}”</p>
              <h3 className="text-lg font-semibold text-center text-gray-800">{testimonial.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TestimonialsCarousel;