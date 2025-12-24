import Link from 'next/link';
import { Building2, Calendar, Users } from 'lucide-react';
import prisma from '@/backend/lib/prisma';

export default async function AdminDashboard() {
    const hotelCount = await prisma.hotel.count();
    const roomCount = await prisma.room.count();
    const bookingCount = await prisma.booking.count();
    const userCount = await prisma.user.count();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-medium">Total Hotels</h3>
                        <div className="p-2 bg-blue-50 text-blue-500 rounded-lg">
                            <Building2 size={24} />
                        </div>
                    </div>
                    <p className="text-3xl font-bold">{hotelCount}</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-medium">Total Rooms</h3>
                        <div className="p-2 bg-orange-50 text-orange-500 rounded-lg">
                            <Building2 size={24} />
                        </div>
                    </div>
                    <p className="text-3xl font-bold">{roomCount}</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-medium">Total Bookings</h3>
                        <div className="p-2 bg-green-50 text-green-500 rounded-lg">
                            <Calendar size={24} />
                        </div>
                    </div>
                    <p className="text-3xl font-bold">{bookingCount}</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-medium">Total Users</h3>
                        <div className="p-2 bg-purple-50 text-purple-500 rounded-lg">
                            <Users size={24} />
                        </div>
                    </div>
                    <p className="text-3xl font-bold">{userCount}</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="flex justify-center gap-4">
                    <Link href="/admin/hotels/new" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add New Hotel</Link>
                </div>
            </div>
        </div>
    );
}
