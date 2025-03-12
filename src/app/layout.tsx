'use client'

import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'

import 'dayjs/locale/ru'

import '../utils/error-map'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  AppShell,
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from '@mantine/core'
import { Notifications } from '@mantine/notifications'

import { UserProvider } from '@/context/user-context'

import { HeaderComponent } from './components/header/header.component'
import { Navbar } from './components/navbar/navbar.component'
import { DatesProvider } from '@mantine/dates'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const queryClient = new QueryClient()

  return (
    <html lang='en' {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <UserProvider>
          <QueryClientProvider client={queryClient}>
            <MantineProvider>
              <Notifications />

              <DatesProvider
                settings={{
                  locale: 'ru',
                  timezone: 'Asia/Krasnoyarsk',
                }}
              >
                <AppShell
                  navbar={{ width: 200, breakpoint: 'sm' }}
                  padding='md'
                  header={{ height: 60 }}
                >
                  <AppShell.Header>
                    <HeaderComponent />
                  </AppShell.Header>
                  <AppShell.Navbar p='md'>
                    <Navbar />
                  </AppShell.Navbar>
                  <AppShell.Main>{children}</AppShell.Main>
                </AppShell>
              </DatesProvider>
            </MantineProvider>
          </QueryClientProvider>
        </UserProvider>
      </body>
    </html>
  )
}
