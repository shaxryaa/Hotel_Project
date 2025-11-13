import React from 'react'

const SellingPoints = () => {
  return (
    <section className="py-16 px-6 space-y-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Us</h2>
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Comfort Meets Luxury</h2>
          <p className="text-gray-700">
            StayKaro offers a seamless hotel booking experience with luxurious rooms,
            handpicked amenities, and 24/7 customer support — all designed to give you 
            a hassle-free stay at unbeatable prices.
          </p>
        </div>
        <div className="md:w-1/2">
          <img
            src="/hotelimage3.jpg"
            alt="Luxury Room"
            className="w-full rounded-lg shadow-lg object-cover h-64"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row-reverse items-center gap-10">
        <div className="md:w-1/2">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Instant Booking & Support</h2>
          <p className="text-gray-700">
            With our easy-to-use platform, users can book hotels instantly and receive real-time 
            confirmations. Our support team is always just a click away to ensure your plans go smoothly.
          </p>
        </div>
        <div className="md:w-1/2">
          <img
            src="/hotelimage4.webp"
            alt="Booking Support"
            className="w-full rounded-lg shadow-lg object-cover h-64"
          />
        </div>
      </div>
    </section>
  );
};

export default SellingPoints;