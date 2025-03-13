'use client'

import useUserData from '@/utils/hooks/use-user-data'
import { Avatar, Button, Flex, Popover, Title } from '@mantine/core'
import { usePathname, useRouter } from 'next/navigation'

export const HeaderComponent = () => {
  const user = useUserData()

  const router = useRouter()

  const pathname = usePathname()

  if (['/sign-in', '/sign-up'].includes(pathname)) {
    return null
  }

  const signOff = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    router.push('/sign-in')
  }

  return (
    <Flex w='100%' justify='space-between' align='center' h='100%' px={32}>
      <Flex ml={32}>
        <Title order={2}>Coinly</Title>
      </Flex>
      <Flex>
        <Popover>
          <Popover.Target>
            <Avatar
              style={{
                cursor: 'pointer',
              }}
              radius='xl'
            >
              {user?.name}
            </Avatar>
          </Popover.Target>
          <Popover.Dropdown>
            <Button onClick={signOff} variant='transparent'>
              Выйти
            </Button>
          </Popover.Dropdown>
        </Popover>
      </Flex>
    </Flex>
  )
}
