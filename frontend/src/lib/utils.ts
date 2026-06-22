import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
export function formatDate(d: string | Date) {
  return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(d));
}
export function formatDateTime(d: string | Date) {
  return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(d));
}
export function formatNumber(v: number, d = 0) {
  return new Intl.NumberFormat('tr-TR', { minimumFractionDigits: d, maximumFractionDigits: d }).format(v);
}
export function formatWeight(kg: number) { return `${formatNumber(kg, 1)} kg`; }
export function formatCurrency(v: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(v);
}
export function formatCm(v: number) { return `${formatNumber(v, 1)} cm`; }

const maps: Record<string, Record<string, string>> = {
  workshopStatus: { active: 'Aktif', inactive: 'Pasif', renovating: 'Renovasyon' },
  skillLevel: { apprentice: 'Çırak', journeyman: 'Kalfa', master: 'Usta' },
  weaverStatus: { active: 'Aktif', inactive: 'Pasif' },
  loomStatus: { active: 'Aktif', maintenance: 'Bakımda', idle: 'Boşta' },
  orderStatus: { pending: 'Beklemede', in_progress: 'Devam Ediyor', completed: 'Tamamlandı', cancelled: 'İptal' },
  runStatus: { in_progress: 'Devam Ediyor', completed: 'Tamamlandı', paused: 'Duraklatıldı' },
  inspectionResult: { pass: 'Geçti', fail: 'Kaldı', review: 'İnceleme' },
  shipmentStatus: { pending: 'Beklemede', shipped: 'Kargoda', delivered: 'Teslim Edildi' },
  userRole: { admin: 'Yönetici', workshop_manager: 'Atölye Müdürü', master_weaver: 'Usta Dokumacı', quality_inspector: 'Kalite Kontrol', sales_coordinator: 'Satış Koordinatörü' },
};
export function label(map: keyof typeof maps, key: string) { return maps[map][key] || key; }
export function unwrapList<T>(r: T[] | { data: T[] }) { return Array.isArray(r) ? r : r.data ?? []; }
