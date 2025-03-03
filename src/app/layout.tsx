'use client'
import '../utils/error-map'

import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { UserProvider } from '@/context/user-context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppShell, MantineProvider } from '@mantine/core'
import { HeaderComponent } from './components/header/header.component'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const queryClient = new QueryClient()

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <AppShell header={<HeaderComponent />}>
            <html lang='en'>
              <body className={`${geistSans.variable} ${geistMono.variable}`}>
                {children}
              </body>
            </html>
          </AppShell>
        </MantineProvider>
      </QueryClientProvider>
    </UserProvider>
  )
}
