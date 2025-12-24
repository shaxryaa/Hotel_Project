import prisma from '@/backend/lib/prisma';
import { Calendar, User, Building2 } from 'lucide-react';

export default async function AdminBookingsPage() {
    const bookings = await prisma.booking.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            user: { select: { name: true, email: true } },
            room: {
                select: {
                    name: true,
                    hotel: { select: { name: true } }
                }
            }
        }
    });

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Manage Bookings</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-700">ID</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Guest</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Hotel / Room</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Dates</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
                            <th className="px-6 py-4 font-semibold text-gray-700 text-right">Amout</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {bookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-gray-50/50">
                                <td className="px-6 py-4 text-gray-500">#{booking.id}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <User size={16} className="text-gray-400" />
                                        <div>
                                            <div className="font-medium text-gray-900">{booking.user.name}</div>
                                            <div className="text-sm text-gray-500">{booking.user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Building2 size={16} className="text-gray-400" />
                                        <div>
                                            <div className="font-medium text-gray-900">{booking.room.hotel.name}</div>
                                            <div className="text-sm text-gray-500">{booking.room.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-600 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} className="text-gray-400" />
                                        {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium 
                        ${booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                                            booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-red-100 text-red-700'}`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right font-medium">
                                    ₹{booking.totalPrice}
                                </td>
                            </tr>
                        ))}
                        {bookings.length === 0 && (
                            <tr>
                                <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                    No bookings found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
