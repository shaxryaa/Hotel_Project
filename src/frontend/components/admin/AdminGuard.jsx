'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminGuard({ children }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        async function checkAuth() {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login'); // Or just show not admin
                setLoading(false);
                return;
            }

            try {
                const res = await fetch('/api/auth/me', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (res.ok) {
                    const data = await res.json();
                    if (data.user.email === 'example@gmail.com') { // Check isAdmin too if you rely on it
                        setAuthorized(true);
                    } else {
                        setAuthorized(false);
                    }
                } else {
                    setAuthorized(false);
                }
            } catch (e) {
                console.error(e);
                setAuthorized(false);
            } finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!authorized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-100 max-w-md">
                    <h1 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h1>
                    <p className="text-gray-600 text-lg">You are not admin</p>
                    <div className="mt-6">
                        <button
                            onClick={() => router.push('/')}
                            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                        >
                            Go Home
                        </button>
                        <button
                            onClick={() => {
                                localStorage.removeItem('token');
                                router.push('/login');
                            }}
                            className="ml-3 px-4 py-2 text-gray-600 hover:text-gray-900"
                        >
                            Login as Admin
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
