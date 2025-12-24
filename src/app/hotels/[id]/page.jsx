import { notFound } from "next/navigation";
import Link from "next/link";
// import { getHotelById } from "@/data/hotels";
import prisma from "@/backend/lib/prisma";
import RoomCard from "@/frontend/components/RoomCard";

const Stat = ({ label, value }) => (
  <div className="text-center bg-gray-50 rounded-lg p-3">
    <div className="text-lg font-semibold text-gray-900">{value}</div>
    <div className="text-xs text-gray-500">{label}</div>
  </div>
);

const HotelDetailPage = async ({ params }) => {
  const { id } = await params;

  const hotel = await prisma.hotel.findUnique({
    where: { id: parseInt(id) },
    include: {
      rooms: true,
      reviews: true
    }
  });

  if (!hotel) {
    return notFound();
  }

  // Calculate generic rating if not stored (optional, reusing logic from list)
  const rating = hotel.reviews?.length > 0
    ? (hotel.reviews.reduce((acc, r) => acc + r.rating, 0) / hotel.reviews.length).toFixed(1)
    : 'New';

  // Placeholder static data for fields not in DB yet or to match design
  const displayHotel = {
    ...hotel,
    title: hotel.name,
    location: `${hotel.city}, ${hotel.country}`,
    image: hotel.mainImage || hotel.images[0] || '/placeholder.jpg',
    rating,
    ratingCount: hotel.reviews.length,
    beds: 3, // Dummy
    baths: 2, // Dummy
    sqft: 1200, // Dummy
    about: hotel.description, // Reusing description for now
    price: hotel.rooms.length > 0 ? Math.min(...hotel.rooms.map(r => r.price)) : 'N/A'
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      <div className="flex flex-col gap-6">
        <div className="rounded-2xl overflow-hidden shadow-sm">
          <img src={displayHotel.image} alt={displayHotel.title} className="w-full h-[360px] object-cover" />
        </div>

        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{displayHotel.title}</h1>
            <p className="text-gray-600 mt-2">{displayHotel.location}</p>
          </div>
          <div className="flex items-center gap-2 text-orange-500 font-semibold">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.049 9.397c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.97z" />
            </svg>
            <span>{displayHotel.rating}</span>
            <span className="text-gray-500 text-sm">({displayHotel.ratingCount} reviews)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Stat label="Beds" value={displayHotel.beds} />
          <Stat label="Baths" value={displayHotel.baths} />
          <Stat label="Area" value={`${displayHotel.sqft} sqft`} />
          <Stat label="From" value={`₹${displayHotel.price}/night`} />
        </div>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">Description</h2>
            <p className="text-gray-700 leading-relaxed">{displayHotel.description}</p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">About this property</h2>
            <p className="text-gray-700 leading-relaxed">{displayHotel.about}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Choose your room</h2>
            <div className="space-y-4">
              {hotel.rooms.map((room) => (
                <RoomCard key={room.id} room={room} hotelId={hotel.id} />
              ))}
            </div>
          </div>
        </div>

        <aside className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 h-fit space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">From</p>
              <p className="text-2xl font-bold text-gray-900">₹{displayHotel.price}</p>
              <p className="text-xs text-gray-500">per night · taxes extra</p>
            </div>
            <div className="text-orange-500 font-semibold flex items-center gap-1">
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.049 9.397c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.97z" />
              </svg>
              {displayHotel.rating}
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-4">
            Select a room above to confirm your booking dates.
          </p>
          <p className="text-xs text-gray-500 text-center">You will see full price with taxes before confirming.</p>
        </aside>
      </section>
    </main>
  );
};

export default HotelDetailPage;

