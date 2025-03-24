'use client';

import { ThemeProvider } from 'next-themes';
import { UploadProvider } from '@/context/UploadContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={true}
      disableTransitionOnChange
    >
      <UploadProvider> {/* Ensure UploadProvider wraps everything */}
        {children}
      </UploadProvider>
    </ThemeProvider>
  );
}
