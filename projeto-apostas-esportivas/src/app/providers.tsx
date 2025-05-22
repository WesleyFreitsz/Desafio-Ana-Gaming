'use client';

// src/app/providers.tsx

import { SessionProvider } from 'next-auth/react';
import { SportsProvider } from '@/contexts/SportsContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <SportsProvider>
          {children}
        </SportsProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
