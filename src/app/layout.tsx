import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import QueryProvider from '@/components/query-provider';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'The Board',
  description: 'Be professional, be productive',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} "antialiased min-h-screen"`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
