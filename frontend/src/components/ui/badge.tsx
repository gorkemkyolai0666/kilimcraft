import { cn } from '@/lib/utils';
const variants = { default: 'bg-indigo/15 text-indigo border-indigo/30', secondary: 'bg-saffron/15 text-saffron-dark border-saffron/30', success: 'bg-success/15 text-success border-success/30', outline: 'border-border text-muted-foreground' } as const;
export function Badge({ className, variant = 'default', ...props }: React.HTMLAttributes<HTMLSpanElement> & { variant?: keyof typeof variants }) { return <span className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium', variants[variant], className)} {...props} />; }
