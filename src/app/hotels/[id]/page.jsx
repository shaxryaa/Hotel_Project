import { notFound } from "next/navigation";
import Link from "next/link";
import { getHotelById } from "@/data/hotels";

const Stat = ({ label, value }) => (
  <div className="text-center bg-gray-50 rounded-lg p-3">
    <div className="text-lg font-semibold text-gray-900">{value}</div>
    <div className="text-xs text-gray-500">{label}</div>
  </div>
);

const RoomCard = ({ room, hotelId }) => (
  <div className="border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold">{room.name}</h3>
        <p className="text-sm text-gray-500">Sleeps {room.capacity} guests</p>
      </div>
      <div className="text-right">
        <p className="text-xl font-bold text-gray-900">₹{room.price}</p>
        <p className="text-xs text-gray-500">per night</p>
      </div>
    </div>
    <ul className="flex flex-wrap gap-2 text-xs text-gray-600">
      {room.amenities.map((amenity) => (
        <li key={amenity} className="px-2 py-1 bg-gray-100 rounded-full">{amenity}</li>
      ))}
    </ul>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div className="flex flex-col">
        <label className="text-xs text-gray-600 mb-1" htmlFor={`checkin-${room.name}`}>Check-in</label>
        <input id={`checkin-${room.name}`} type="date" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div className="flex flex-col">
        <label className="text-xs text-gray-600 mb-1" htmlFor={`checkout-${room.name}`}>Check-out</label>
        <input id={`checkout-${room.name}`} type="date" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div className="flex flex-col">
        <label className="text-xs text-gray-600 mb-1" htmlFor={`travelers-${room.name}`}>Travellers</label>
        <select id={`travelers-${room.name}`} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          {[1,2,3,4,5,6].map((count) => (
            <option key={count} value={count}>{count}</option>
          ))}
        </select>
      </div>
    </div>
    <Link
      href={`/hotels/${hotelId}?room=${encodeURIComponent(room.name)}`}
      className="inline-flex justify-center items-center gap-2 bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Book this room
    </Link>
  </div>
);

const HotelDetailPage = async ({ params }) => {
  const { id } = await params;
  const hotel = getHotelById(id);

  if (!hotel) {
    return notFound();
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      <div className="flex flex-col gap-6">
        <div className="rounded-2xl overflow-hidden shadow-sm">
          <img src={hotel.image} alt={hotel.title} className="w-full h-[360px] object-cover" />
        </div>

        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{hotel.title}</h1>
            <p className="text-gray-600 mt-2">{hotel.location}</p>
          </div>
          <div className="flex items-center gap-2 text-orange-500 font-semibold">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.049 9.397c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.97z" />
            </svg>
            <span>{hotel.rating}</span>
            <span className="text-gray-500 text-sm">({hotel.ratingCount} reviews)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Stat label="Beds" value={hotel.beds} />
          <Stat label="Baths" value={hotel.baths} />
          <Stat label="Area" value={`${hotel.sqft} sqft`} />
          <Stat label="From" value={`₹${hotel.price}/night`} />
        </div>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">Description</h2>
            <p className="text-gray-700 leading-relaxed">{hotel.description}</p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">About this property</h2>
            <p className="text-gray-700 leading-relaxed">{hotel.about}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Choose your room</h2>
            <div className="space-y-4">
              {hotel.rooms.map((room) => (
                <RoomCard key={room.name} room={room} hotelId={hotel.id} />
              ))}
            </div>
          </div>
        </div>

        <aside className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 h-fit space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">From</p>
              <p className="text-2xl font-bold text-gray-900">₹{hotel.price}</p>
              <p className="text-xs text-gray-500">per night · taxes extra</p>
            </div>
            <div className="text-orange-500 font-semibold flex items-center gap-1">
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.049 9.397c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.97z" />
              </svg>
              {hotel.rating}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-col">
              <label className="text-xs text-gray-600 mb-1" htmlFor="checkin-summary">Check-in</label>
              <input id="checkin-summary" type="date" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex flex-col">
              <label className="text-xs text-gray-600 mb-1" htmlFor="checkout-summary">Check-out</label>
              <input id="checkout-summary" type="date" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex flex-col">
              <label className="text-xs text-gray-600 mb-1" htmlFor="travellers-summary">Travellers</label>
              <select id="travellers-summary" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                {[1,2,3,4,5,6].map((count) => (
                  <option key={count} value={count}>{count} guest{count > 1 ? "s" : ""}</option>
                ))}
              </select>
            </div>
          </div>

          <Link
            href={`/hotels/${hotel.id}/book`}
            className="block text-center bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Book now
          </Link>
          <p className="text-xs text-gray-500 text-center">You will see full price with taxes before confirming.</p>
        </aside>
      </section>
    </main>
  );
};

export default HotelDetailPage;

