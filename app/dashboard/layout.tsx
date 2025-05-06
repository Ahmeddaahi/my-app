'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { 
  Package, 
  User, 
  MapPin, 
  Heart,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signOut } from '@/auth';

const sidebarItems = [
  {
    title: 'Orders',
    href: '/dashboard/orders',
    icon: Package
  },
  {
    title: 'Profile',
    href: '/dashboard/profile',
    icon: User
  },
  {
    title: 'Addresses',
    href: '/dashboard/addresses',
    icon: MapPin
  },
  {
    title: 'Wishlist',
    href: '/dashboard/wishlist',
    icon: Heart
  }
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col border-r bg-gray-50/40">
        <div className="flex h-14 items-center border-b px-4">
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-gray-100',
                  pathname === item.href ? 'bg-gray-100 text-gray-900' : 'text-gray-500'
                )}
              >
                <Icon className="h-4 w-4" />
                {item.title}
              </Link>
            );
          })}
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={() => signOut()}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
} 