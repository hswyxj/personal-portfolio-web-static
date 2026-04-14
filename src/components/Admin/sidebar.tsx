'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const sidebarItems = [
  { href: '/admin', label: 'Profile' },
  { href: '/admin/projects', label: 'Projects' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-white/10 p-6 flex flex-col">
      <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
      <nav className="space-y-2 flex-1">
        {sidebarItems.map((item) => {
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-white/10 text-white shadow-sm shadow-white/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
