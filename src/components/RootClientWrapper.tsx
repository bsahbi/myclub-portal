'use client';

import React from 'react';
import { AppProvider } from '@/lib/app-context';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function RootClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <Navbar />
      <main style={{ minHeight: '100vh' }}>
        {children}
      </main>
      <Footer />
    </AppProvider>
  );
}
