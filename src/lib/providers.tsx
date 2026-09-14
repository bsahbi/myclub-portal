'use client';
import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

const AppProvider = dynamic(() => import('@/lib/app-context').then(m => m.AppProvider), {
  ssr: false,
  loading: () => null,
});

export default function Providers({ children }: { children: ReactNode }) {
  return <AppProvider>{children}</AppProvider>;
}
