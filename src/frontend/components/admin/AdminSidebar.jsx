import Link from 'next/link';
import { LayoutDashboard, Building2, Calendar, LogOut } from 'lucide-react';

const AdminSidebar = () => {
    return (
        <aside className="w-64 bg-slate-900 text-white min-h-screen p-4 flex flex-col">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-blue-500">StayKaro Admin</h1>
            </div>

            <nav className="flex-1 space-y-2">
                <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors">
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </Link>
                <Link href="/admin/hotels" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors">
                    <Building2 size={20} />
                    <span>Hotels</span>
                </Link>
                <Link href="/admin/bookings" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors">
                    <Calendar size={20} />
                    <span>Bookings</span>
                </Link>
            </nav>

            <div className="pt-4 border-t border-slate-800">
                <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-white transition-colors">
                    <LogOut size={20} />
                    <span>Exit Admin</span>
                </Link>
            </div>
        </aside>
    );
};

export default AdminSidebar;
