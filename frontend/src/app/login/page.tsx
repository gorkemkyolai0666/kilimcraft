'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
export default function LoginPage() {
  const { login } = useAuth(); const router = useRouter();
  const [email,setEmail]=useState('demo@kilimatolyesi.com.tr'); const [password,setPassword]=useState(''); const [error,setError]=useState(''); const [loading,setLoading]=useState(false);
  const handleSubmit=async(e:React.FormEvent)=>{e.preventDefault();setLoading(true);setError('');try{await login(email,password);router.push('/dashboard');}catch(err){setError(err instanceof Error?err.message:'Giriş başarısız');}finally{setLoading(false);}};
  return (<div className="flex min-h-screen items-center justify-center bg-kilim-pattern px-4"><Card className="w-full max-w-md"><CardHeader><CardTitle className="font-display text-2xl">KilimCraft&apos;a Giriş</CardTitle><p className="text-sm text-muted-foreground">Atölye operasyon panelinize erişin</p></CardHeader><CardContent><form onSubmit={handleSubmit} className="space-y-4"><div><Label htmlFor="email">E-posta</Label><Input id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></div><div><Label htmlFor="password">Şifre</Label><Input id="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></div>{error&&<p className="text-sm text-destructive">{error}</p>}<Button type="submit" className="w-full text-white" disabled={loading}>{loading?'Giriş yapılıyor...':'Giriş Yap'}</Button></form><p className="mt-4 text-center text-sm text-muted-foreground">Hesabınız yok mu? <Link href="/register" className="text-indigo hover:underline">Kayıt olun</Link></p></CardContent></Card></div>);
}
