import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { Inter } from "next/font/google";
import QueryProvider from "@/components/QueryProvider";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "The Board",
  description: "Be professional, be productive",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} "antialiased min-h-screen"`}>
        <QueryProvider>
          <Toaster />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
