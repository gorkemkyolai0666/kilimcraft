import Link from 'next/link';
import { Layers, Palette, Hammer, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <section className="editorial-hero relative flex min-h-[88vh] items-center">
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-saffron-light">Anadolu Mirası Neo-Craft</p>
            <h1 className="font-display text-4xl font-bold leading-tight text-wool sm:text-5xl lg:text-6xl">Kilim ve el dokuma atölyenizi tek panelden yönetin</h1>
            <p className="mt-6 text-lg leading-relaxed text-wool/80">KilimCraft; tezgah, desen, iplik stoku, dokuma siparişleri, üretim kayıtları, kalite kontrol ve sevkiyat operasyonlarını birleştirir.</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg"><Link href="/register">Ücretsiz Başlayın</Link></Button>
              <Button asChild variant="outline" size="lg" className="border-wool/30 text-wool hover:bg-wool/10"><Link href="/login">Giriş Yap</Link></Button>
            </div>
          </div>
        </div>
      </section>
      <section className="border-t border-border bg-card py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4 sm:px-6">
          {[{ icon: Layers, title: 'Atölye Yönetimi', desc: 'Tezgah ve dokumacı takibi' },{ icon: Palette, title: 'Desen Kataloğu', desc: 'Bölgesel motif ve renk paleti' },{ icon: Hammer, title: 'Üretim Takibi', desc: 'Günlük cm ve saat kayıtları' },{ icon: ShieldCheck, title: 'Kalite Kontrol', desc: 'Puan ve kusur denetimi' }].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="editorial-card p-6"><Icon className="mb-4 h-8 w-8 text-saffron" /><h3 className="font-display text-lg font-semibold">{title}</h3><p className="mt-2 text-sm text-muted-foreground">{desc}</p></div>
          ))}
        </div>
      </section>
    </div>
  );
}
