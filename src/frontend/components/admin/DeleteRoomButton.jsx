'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DeleteRoomButton({ hotelId, roomId }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this room?')) return;

        setLoading(true);
        try {
            // We need a proper API for deleting rooms. 
            // Assuming DELETE /api/hotels/[id]/rooms?roomId=... or /api/rooms/[id]
            const res = await fetch(`/api/rooms/${roomId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!res.ok) {
                throw new Error('Failed to delete room');
            }

            toast.success('Room deleted successfully');
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete room');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className={`p-2 text-red-600 hover:bg-red-50 rounded-lg ${loading ? 'opacity-50' : ''}`}
            title="Delete Room"
        >
            <Trash2 size={16} />
        </button>
    );
}
