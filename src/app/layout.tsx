'use client'

import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/charts/styles.css'

import 'dayjs/locale/ru'

import '../utils/error-map'

import { QueryClientProvider } from '@tanstack/react-query'
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
import { usePathname } from 'next/navigation'
import { NewBalanceModal } from './components/new-balance-modal'
import { useMediaQuery } from '@mantine/hooks'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from './queryClient'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  const isOnLoginScreen = ['/sign-in', '/sign-up'].includes(pathname)

  const isMobile = useMediaQuery('(max-width: 1000px)')

  return (
    <html lang='en' {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <UserProvider>
          <QueryClientProvider client={queryClient}>
            {/* <ReactQueryDevtools client={queryClient} initialIsOpen={false} /> */}

            <MantineProvider>
              <Notifications />
              {!isOnLoginScreen && <NewBalanceModal />}

              <DatesProvider
                settings={{
                  locale: 'ru',
                  timezone: 'Asia/Krasnoyarsk',
                }}
              >
                <AppShell
                  navbar={{
                    width: isOnLoginScreen ? 0 : { sm: 0, md: 200 },
                    breakpoint: 'sm',
                  }}
                  padding='md'
                  header={{ height: isOnLoginScreen ? 0 : 60 }}
                >
                  {!isOnLoginScreen && (
                    <>
                      <AppShell.Header>
                        <HeaderComponent />
                      </AppShell.Header>
                      {!isMobile && (
                        <AppShell.Navbar p='md'>
                          <Navbar />
                        </AppShell.Navbar>
                      )}
                    </>
                  )}
                  <AppShell.Main bg={'rgb(234, 245, 255)'}>
                    {children}
                  </AppShell.Main>
                </AppShell>
              </DatesProvider>
            </MantineProvider>
          </QueryClientProvider>
        </UserProvider>
      </body>
    </html>
  )
}
