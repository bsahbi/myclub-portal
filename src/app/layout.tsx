import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import RootClientWrapper from '@/components/RootClientWrapper';

export const metadata: Metadata = {
  title: { default: 'MyClub — MENA Martial Arts Portal', template: '%s | MyClub' },
  description: 'Premier directory for martial arts clubs, coaches, athletes & tournaments across MENA.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <RootClientWrapper>{children}</RootClientWrapper>
      </body>
    </html>
  );
}
