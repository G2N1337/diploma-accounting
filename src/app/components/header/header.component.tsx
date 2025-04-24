'use client'

import useUserData from '@/utils/hooks/use-user-data'
import { useGetUserBalance } from '@/utils/requests/get-users-balance'
import {
  Avatar,
  Button,
  Flex,
  Pill,
  Popover,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export const HeaderComponent = () => {
  const user = useUserData()
  const {
    data: { totalBalance },
  } = useGetUserBalance()

  const router = useRouter()

  const pathname = usePathname()

  const isMobile = useMediaQuery('(max-width: 1000px)')

  if (['/sign-in', '/sign-up'].includes(pathname)) {
    return null
  }

  const onDashboard = ['/dashboard'].includes(pathname)

  const signOff = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    router.push('/sign-in')
  }

  return (
    <Flex w='100%' justify='space-between' align='center' h='100%' px={32}>
      <Flex ml={32}>
        <Title order={2}>Система</Title>
      </Flex>
      <Flex align='center' gap={24}>
        {totalBalance !== null && !onDashboard && (
          <Pill size='lg'>
            Баланс:{' '}
            <Text
              fw='bolder'
              style={{
                backgroundImage: 'linear-gradient(red, blue)',
                color: 'transparent',
                backgroundClip: 'text',
              }}
              span
            >
              {totalBalance?.toLocaleString('ru-RU')}₽
            </Text>
          </Pill>
        )}
        <Popover>
          <Popover.Target>
            <Avatar
              style={{
                cursor: 'pointer',
              }}
              radius='xl'
            >
              {user?.name.substring(0, 1)}
            </Avatar>
          </Popover.Target>
          <Popover.Dropdown>
            <Stack>
              {isMobile && (
                <>
                  <Button variant='transparent'>
                    <Link
                      style={{
                        color: 'var(--mantine-color-blue-6)',
                        textDecoration: 'none',
                      }}
                      href='/dashboard'
                    >
                      Главная
                    </Link>
                  </Button>
                  <Button variant='transparent'>
                    <Link
                      style={{
                        color: 'var(--mantine-color-blue-6)',
                        textDecoration: 'none',
                      }}
                      href='/reports'
                    >
                      Отчеты
                    </Link>
                  </Button>
                </>
              )}
              <Button onClick={signOff} variant='transparent'>
                Выйти
              </Button>
            </Stack>
          </Popover.Dropdown>
        </Popover>
      </Flex>
    </Flex>
  )
}
