'use client';
import Link from 'next/link';
import { useFavorites } from '@/hooks/useFavorites';
import { hotels } from '@/data/hotels';

const FavouritesPage = () => {
  const { favorites, loading } = useFavorites();
  const favouriteHotels = hotels.filter((h) => favorites.includes(h.id));

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Your favourites</h1>
          <p className="text-gray-600 mt-2">Saved stays you’ve hearted.</p>
        </div>
        <Link href="/hotels" className="text-blue-600 font-semibold hover:underline">
          Browse all hotels
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading favourites...</p>
      ) : favouriteHotels.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-700 font-medium">No favourites yet</p>
          <p className="text-gray-500 text-sm">Tap the heart on any featured hotel to save it here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favouriteHotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <img src={hotel.image} alt={hotel.title} className="w-full h-48 object-cover" />
              <div className="p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{hotel.title}</h2>
                    <p className="text-sm text-gray-500">{hotel.location}</p>
                  </div>
                  <div className="text-sm text-orange-500 font-semibold flex items-center gap-1">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.049 9.397c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.97z" />
                    </svg>
                    {hotel.rating}
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{hotel.description}</p>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-bold text-gray-900">₹{hotel.price}<span className="text-sm text-gray-500">/night</span></span>
                  <Link href={`/hotels/${hotel.id}`} className="text-blue-600 font-semibold hover:underline">
                    View details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default FavouritesPage;