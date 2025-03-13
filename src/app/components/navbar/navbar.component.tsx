import { ActionIcon, Button, Drawer, Stack } from '@mantine/core'
import React from 'react'
import { IconPlus } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import { DrawerContent } from './drawer.component'
import Link from 'next/link'

export const Navbar = () => {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <Stack h='100%'>
      <ActionIcon onClick={open} mx='auto' size='xl' radius='xl'>
        <IconPlus />
      </ActionIcon>
      <Drawer opened={opened} onClose={close} title='Добавить расходы'>
        <DrawerContent closeDrawer={close} />
      </Drawer>
      <Button variant='transparent'>
        <Link href='/dashboard'>Главная</Link>
      </Button>
      <Button variant='transparent'>
        <Link href='/reports'>Отчеты</Link>
      </Button>
    </Stack>
  )
}
