import { ReactNode } from 'react';
import AdminSidebar from '@/components/Admin/sidebar';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      <AdminSidebar />
      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}
