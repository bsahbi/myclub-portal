import React from 'react';
import { AppProvider, useApp } from '@/lib/app-context';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function App() {
  return (
    <AppProvider>
      <Navbar />
      <main style={{ minHeight: '100vh' }}>
        <RouterView />
      </main>
      <Footer />
    </AppProvider>
  );
}

function RouterView() {
  // This component is kept for backwards compat during migration.
  // In production, Next.js App Router pages replace its role entirely.
  return (
    <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
      MyClub Portal — Next.js App Router conversion in progress.
    </div>
  );
}
