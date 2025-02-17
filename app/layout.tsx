import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { Toaster } from '@/components/ui/toaster';
import { ThemeToggle } from '@/components/theme-toggle';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OOPS! I DIDNT STUDY',
  description: 'Your ultimate study companion',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background`}>
        <Providers>
          <div className="flex min-h-screen">
            {/* Sidebar */}
            <nav className="w-64 bg-card/50 p-4 space-y-4">
              <div className="flex items-center space-x-2 mb-8">
                <span className="font-bold text-lg">Menu</span>
              </div>
              <div className="space-y-2">
                <a href="/" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent transition-colors">
                  <span>Home</span>
                </a>
                <a href="/upload" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent transition-colors">
                  <span>Upload Files</span>
                </a>
                <a href="/panic-notes" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent transition-colors">
                  <span>Panic Notes</span>
                </a>
                <a href="/crambot" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent transition-colors">
                  <span>CramBot</span>
                </a>
                <a href="/quizzard" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent transition-colors">
                  <span>Quizzard</span>
                </a>
              </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 p-8">
              <div className="flex justify-end mb-4">
                <ThemeToggle />
              </div>
              {children}
            </main>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}