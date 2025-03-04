'use client'

import useUserData from '@/utils/hooks/use-user-data'
import { Avatar, Flex, Popover, Title } from '@mantine/core'
import { usePathname } from 'next/navigation'

export const HeaderComponent = () => {
  const user = useUserData()

  const pathname = usePathname()

  if (['/sign-in', '/sign-up'].includes(pathname)) {
    return null
  }

  return (
    <Flex w='100%' justify='space-between' align='center' h='100%' px={32}>
      <Flex>
        <Title order={2}>CoinTrack</Title>
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
          <Popover.Dropdown>jopa</Popover.Dropdown>
        </Popover>
      </Flex>
    </Flex>
  )
}
