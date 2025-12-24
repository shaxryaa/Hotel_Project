import Link from 'next/link';
import prisma from '@/backend/lib/prisma';
import { Plus, Edit, Trash2, MapPin } from 'lucide-react';
import DeleteHotelButton from '@/frontend/components/admin/DeleteHotelButton';

export default async function AdminHotelsPage() {
    const hotels = await prisma.hotel.findMany({
        orderBy: { createdAt: 'desc' },
        include: { _count: { select: { rooms: true } } }
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Manage Hotels</h1>
                <Link href="/admin/hotels/new" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Plus size={20} />
                    Add Hotel
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-700">Name</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Location</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Rooms</th>
                            <th className="px-6 py-4 font-semibold text-gray-700 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {hotels.map((hotel) => (
                            <tr key={hotel.id} className="hover:bg-gray-50/50">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">{hotel.name}</div>
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <MapPin size={16} />
                                        {hotel.city}, {hotel.country}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {hotel._count.rooms} rooms
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link href={`/admin/hotels/${hotel.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                            <Edit size={18} />
                                        </Link>
                                        <DeleteHotelButton hotelId={hotel.id} />
                                        <Link href={`/admin/hotels/${hotel.id}/rooms/new`} className="p-2 text-green-600 hover:bg-green-50 rounded-lg" title="Add Room">
                                            <Plus size={18} />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {hotels.length === 0 && (
                            <tr>
                                <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                                    No hotels found. Create one to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
