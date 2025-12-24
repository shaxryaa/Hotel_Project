'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DeleteHotelButton({ hotelId }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this hotel? This action cannot be undone.')) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/hotels/${hotelId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!res.ok) throw new Error('Failed to delete hotel');

            toast.success('Hotel deleted successfully');
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete hotel');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className={`p-2 text-red-600 hover:bg-red-50 rounded-lg ${loading ? 'opacity-50' : ''}`}
            title="Delete Hotel"
        >
            <Trash2 size={18} />
        </button>
    );
}
