import { notFound } from 'next/navigation';
import prisma from '@/backend/lib/prisma';
import EditHotelForm from '@/frontend/components/admin/EditHotelForm';
import DeleteRoomButton from '@/frontend/components/admin/DeleteRoomButton';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default async function EditHotelPage({ params }) {
    const { id } = await params;
    const hotel = await prisma.hotel.findUnique({
        where: { id: parseInt(id) },
        include: { rooms: true }
    });

    if (!hotel) {
        notFound();
    }

    return (
        <div className="max-w-2xl mx-auto space-y-12">
            <div>
                <h1 className="text-2xl font-bold mb-8">Edit Hotel</h1>
                <EditHotelForm hotel={hotel} />
            </div>

            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Rooms</h2>
                    <Link
                        href={`/admin/hotels/${hotel.id}/rooms/new`}
                        className="flex items-center gap-1 text-sm bg-green-50 text-green-700 px-3 py-2 rounded-lg hover:bg-green-100"
                    >
                        <Plus size={16} /> Add Room
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {hotel.rooms.length === 0 ? (
                        <p className="p-8 text-center text-gray-500">No rooms added yet.</p>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {hotel.rooms.map(room => (
                                <div key={room.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                                    <div>
                                        <h3 className="font-medium text-gray-900">{room.name}</h3>
                                        <p className="text-sm text-gray-500">₹{room.price} • {room.capacity} guests</p>
                                    </div>
                                    <DeleteRoomButton hotelId={hotel.id} roomId={room.id} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
