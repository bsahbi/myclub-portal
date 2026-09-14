import type { Metadata } from 'next';
import { ReactNode } from 'react';
import Providers from '@/lib/providers';

export const metadata: Metadata = {
  title: { default: 'MyClub — MENA Martial Arts Portal', template: '%s | MyClub' },
  description: 'Premier directory for martial arts clubs, coaches, athletes & tournaments across MENA.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
