import { ReactNode } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-4 flex-1">
          <Link href="/admin" className="block text-gray-400 hover:text-white transition-colors">Profile</Link>
          <Link href="/admin/projects" className="block text-gray-400 hover:text-white transition-colors">Projects</Link>
        </nav>
        <div className="text-sm text-gray-500 truncate">{user.email}</div>
      </aside>
      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}
