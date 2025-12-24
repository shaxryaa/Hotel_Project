import AdminSidebar from '@/frontend/components/admin/AdminSidebar';
import AdminGuard from '@/frontend/components/admin/AdminGuard';

export default function AdminLayout({ children }) {
    return (
        <AdminGuard>
            <div className="flex min-h-screen bg-gray-50">
                <AdminSidebar />
                <main className="flex-1 p-8 overflow-y-auto h-screen">
                    {children}
                </main>
            </div>
        </AdminGuard>
    );
}
