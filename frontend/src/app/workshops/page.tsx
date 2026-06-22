'use client';
import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { AppLayout } from '@/components/app-layout';
import { api } from '@/lib/api';
import { DataTable } from '@/components/data-table';
import { ErrorState, EmptyState, TableSkeleton } from '@/components/states';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/lib/toast-context';
import { formatDate, label } from '@/lib/utils';
export default function Page() {
  const { toast } = useToast();
  const [rows,setRows]=useState<Array<Record<string,unknown>>>([]);
  const [loading,setLoading]=useState(true); const [error,setError]=useState(false); const [page,setPage]=useState(1);
  const load=()=>{setLoading(true);setError(false);api.workshops.list().then(d=>setRows(d as typeof rows)).catch(()=>setError(true)).finally(()=>setLoading(false));};
  useEffect(()=>{load();},[]);
  return (<AppLayout><div className="space-y-6"><div className="flex flex-wrap items-center justify-between gap-4"><div><h1 className="font-display text-3xl font-bold">Atölyeler</h1><p className="text-muted-foreground">Kilim dokuma atölyesi envanteri</p></div><Button className="text-white"><Plus className="mr-2 h-4 w-4"/>Yeni Ekle</Button></div><div className="brutal-divider"/>{loading&&<TableSkeleton/>}{error&&<ErrorState onRetry={load}/>}{!loading&&!error&&rows.length===0&&<EmptyState title="Kayıt yok" description="Henüz kayıt bulunmuyor"/>}{!loading&&!error&&rows.length>0&&<DataTable data={rows} page={page} pageSize={8} onPageChange={setPage} columns={[{key:'id',header:'Kayıt',render:(r)=><span className="font-medium">{String(Object.values(r)[1]??r.id).slice(0,32)}</span>},{key:'status',header:'Durum',render:(r)=><Badge>{label('workshopStatus',String(r.status))}</Badge>},{key:'createdAt',header:'Oluşturulma',render:(r)=>formatDate(String(r.createdAt))},{key:'a',header:'',render:(r)=><button onClick={async()=>{if(confirm('Sil?')){try{await api.workshops.delete(String(r.id));toast('Silindi','success');load();}catch{toast('Hata','error');}}}}><Trash2 className="h-4 w-4 text-destructive"/></button>}]} />}</div></AppLayout>);
}
