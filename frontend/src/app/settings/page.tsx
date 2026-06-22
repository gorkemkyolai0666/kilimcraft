'use client';
import { AppLayout } from '@/components/app-layout'; import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/auth-context'; import { useTheme } from '@/lib/theme-context'; import { Button } from '@/components/ui/button'; import { label } from '@/lib/utils';
export default function SettingsPage() {
  const { user } = useAuth(); const { theme, toggleTheme } = useTheme();
  return (<AppLayout><div className="space-y-6"><div><h1 className="font-display text-3xl font-bold">Ayarlar</h1><p className="text-muted-foreground">Hesap ve görünüm tercihleri</p></div><Card><CardHeader><CardTitle className="font-display">Profil</CardTitle></CardHeader><CardContent className="space-y-2 text-sm">{user&&<><p><strong>Ad:</strong> {user.name}</p><p><strong>E-posta:</strong> {user.email}</p><p><strong>Rol:</strong> {label('userRole',user.role)}</p></>}</CardContent></Card><Card><CardHeader><CardTitle className="font-display">Görünüm</CardTitle></CardHeader><CardContent><p className="mb-4 text-sm text-muted-foreground">Mevcut tema: {theme==='light'?'Açık':'Koyu'}</p><Button onClick={toggleTheme} className="text-white">Temayı Değiştir</Button></CardContent></Card></div></AppLayout>);
}
