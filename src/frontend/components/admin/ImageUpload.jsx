'use client';

import { useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';

export default function ImageUpload({ value, onChange, label = 'Image' }) {
    const [loading, setLoading] = useState(false);
    const [dragging, setDragging] = useState(false);

    const handleUpload = async (file) => {
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (!res.ok) {
                throw new Error('Upload failed');
            }

            const data = await res.json();
            onChange(data.url);
        } catch (error) {
            console.error(error);
            alert('Failed to upload image');
        } finally {
            setLoading(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        if (e.dataTransfer.files?.[0]) {
            handleUpload(e.dataTransfer.files[0]);
        }
    };

    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>

            {value ? (
                <div className="relative rounded-lg border border-gray-200 overflow-hidden w-full max-w-md aspect-video bg-gray-50 flex items-center justify-center">
                    <img
                        src={value}
                        alt="Uploaded"
                        className="w-full h-full object-cover"
                    />
                    <button
                        type="button"
                        onClick={() => onChange('')}
                        className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                    >
                        <X size={16} />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-white text-xs truncate">
                        {value}
                    </div>
                </div>
            ) : (
                <div
                    className={`relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors
                        ${dragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'}`}
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => handleUpload(e.target.files?.[0])}
                        disabled={loading}
                    />

                    {loading ? (
                        <div className="flex flex-col items-center text-blue-600">
                            <Loader2 size={32} className="animate-spin mb-2" />
                            <span className="text-sm font-medium">Uploading...</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center text-gray-500">
                            <Upload size={32} className="mb-2" />
                            <span className="text-sm font-medium text-gray-700">Click to upload or drag & drop</span>
                            <span className="text-xs mt-1">SVG, PNG, JPG or WEBP (MAX. 2MB)</span>
                        </div>
                    )}
                </div>
            )}

            {/* Fallback manual input in case they still want to paste URLs */}
            {!value && (
                <div className="mt-2 text-xs text-right text-gray-500">
                    Or paste URL manually? <button type="button" onClick={() => {
                        const url = prompt('Enter image URL:');
                        if (url) onChange(url);
                    }} className="text-blue-600 hover:underline">Click here</button>
                </div>
            )}
        </div>
    );
}
