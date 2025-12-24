"use client";
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const RoomCard = ({ room, hotelId }) => {
    const router = useRouter();
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [loading, setLoading] = useState(false);

    const handleBook = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please login to book a room');
            router.push('/login');
            return;
        }

        if (!checkIn || !checkOut) {
            toast.error('Please select check-in and check-out dates');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    roomId: room.id, // Ensure room has id
                    checkIn,
                    checkOut
                })
            });

            const data = await res.json();
            if (res.ok) {
                toast.success('Room booked successfully!');
                router.push('/my-bookings');
            } else {
                toast.error(data.error || 'Failed to book room');
            }
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
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
                    <label className="text-xs text-gray-600 mb-1" htmlFor={`checkin-${room.id}`}>Check-in</label>
                    <input
                        id={`checkin-${room.id}`}
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-xs text-gray-600 mb-1" htmlFor={`checkout-${room.id}`}>Check-out</label>
                    <input
                        id={`checkout-${room.id}`}
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-xs text-gray-600 mb-1" htmlFor={`travelers-${room.id}`}>Travellers</label>
                    <select id={`travelers-${room.id}`} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        {[1, 2, 3, 4, 5, 6].map((count) => (
                            <option key={count} value={count}>{count}</option>
                        ))}
                    </select>
                </div>
            </div>
            <button
                onClick={handleBook}
                disabled={loading}
                className="inline-flex justify-center items-center gap-2 bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            >
                {loading ? 'Booking...' : 'Book this room'}
            </button>
        </div>
    );
};

export default RoomCard;
