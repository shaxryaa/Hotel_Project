"use client";
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const MyBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                // Handle not logged in
                setLoading(false);
                return;
            }

            try {
                const res = await fetch('/api/bookings/my-bookings', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await res.json();
                if (res.ok) {
                    setBookings(data.bookings);
                } else {
                    toast.error(data.error || 'Failed to fetch bookings');
                }
            } catch (error) {
                console.error(error);
                toast.error('Error fetching bookings');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) return <div className="p-12 text-center">Loading bookings...</div>;

    return (
        <main className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
            {bookings.length === 0 ? (
                <p className="text-gray-600">You have no bookings yet.</p>
            ) : (
                <div className="space-y-6">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6">
                            <div className="flex-1 space-y-2">
                                <h2 className="text-xl font-bold">{booking.room.hotel.name}</h2>
                                <h3 className="text-lg text-gray-700">{booking.room.name}</h3>
                                <p className="text-sm text-gray-500">
                                    {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                                </p>
                                <span className={`inline-block px-3 py-1 text-xs rounded-full font-semibold ${booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                                        booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                    }`}>
                                    {booking.status}
                                </span>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-gray-900">₹{booking.totalPrice}</p>
                                <p className="text-sm text-gray-500">Total Price</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
};

export default MyBookingsPage;
