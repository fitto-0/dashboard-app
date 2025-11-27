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
      <html lang="en" className={inter.className} suppressHydrationWarning>
        <head>
          <script dangerouslySetInnerHTML={{
            __html: `
              if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark')
              } else {
                document.documentElement.classList.remove('dark')
              }
            `
          }} />
        </head>
        <body className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-primary-900 dark:via-primary-800 dark:to-primary-900 dark:text-white">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
