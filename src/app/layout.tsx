import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'CareConnect - Social Development Events Platform',
  description:
    'A community-driven event management platform to create, join, and track impactful social development and volunteer events.',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-primary selection:text-white">
        <ThemeProvider>
          <AuthProvider>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3500,
                style: {
                  background: 'var(--surface)',
                  color: 'var(--foreground)',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--card-shadow)',
                },
              }}
            />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
