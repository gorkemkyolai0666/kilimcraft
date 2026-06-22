'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Building2, Users, Grid3X3, Palette, Package, ClipboardList,
  Hammer, ShieldCheck, UserCircle, Truck, Sun, Moon, LogOut, Settings, Layers,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useTheme } from '@/lib/theme-context';
import { cn, label } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/dashboard', label: 'Panel', icon: LayoutDashboard },
  { href: '/workshops', label: 'Atölye', icon: Building2 },
  { href: '/weavers', label: 'Dokumacı', icon: Users },
  { href: '/looms', label: 'Tezgah', icon: Grid3X3 },
  { href: '/patterns', label: 'Desen', icon: Palette },
  { href: '/yarn-batches', label: 'İplik', icon: Package },
  { href: '/weaving-orders', label: 'Sipariş', icon: ClipboardList },
  { href: '/production-runs', label: 'Üretim', icon: Hammer },
  { href: '/quality-inspections', label: 'Kalite', icon: ShieldCheck },
  { href: '/clients', label: 'Müşteri', icon: UserCircle },
  { href: '/shipments', label: 'Sevkiyat', icon: Truck },
  { href: '/settings', label: 'Ayarlar', icon: Settings },
];

export function IconRailNav() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-16 flex-col border-r-2 border-indigo/20 bg-card lg:w-20">
      <Link href="/dashboard" className="flex h-16 items-center justify-center border-b-2 border-indigo/20 bg-indigo text-white" aria-label="KilimCraft ana sayfa">
        <Layers className="h-7 w-7" strokeWidth={2.5} />
      </Link>
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-2" aria-label="Ana menü">
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} title={item.label}
              className={cn('flex flex-col items-center justify-center gap-0.5 rounded-lg border-2 p-2 text-[10px] font-bold uppercase tracking-wider transition-colors',
                active ? 'border-saffron bg-saffron/15 text-indigo' : 'border-transparent text-muted-foreground hover:border-indigo/30 hover:bg-muted')}>
              <Icon className="h-5 w-5" strokeWidth={2.5} /><span className="hidden lg:block">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="flex flex-col gap-1 border-t-2 border-indigo/20 p-2">
        {user && <p className="mb-1 hidden truncate px-1 text-center text-[9px] text-muted-foreground lg:block">{user.name}</p>}
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-10 w-full rounded-lg border-2 border-transparent hover:border-indigo/30" aria-label="Tema değiştir">
          {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={logout} className="h-10 w-full rounded-lg border-2 border-transparent hover:border-destructive hover:text-destructive" aria-label="Çıkış yap">
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </aside>
  );
}
