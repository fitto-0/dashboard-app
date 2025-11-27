import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AgencyPro Dashboard - Professional Agency Management',
  description: 'Modern dashboard for managing agency information and contacts with advanced analytics and secure authentication.',
  keywords: 'agency, dashboard, contacts, management, analytics',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.className}>
        <body className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
