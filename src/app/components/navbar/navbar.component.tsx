import { ActionIcon, Button, Drawer, Stack } from '@mantine/core'
import React from 'react'
import { IconPlus } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import { DrawerContent } from './drawer.component'
import Link from 'next/link'
import { OneCModal } from './import-1c-excel.component'

export const Navbar = () => {
  const [opened, { open, close }] = useDisclosure(false)

  const [openedImport, { open: openImport, close: closeImport }] =
    useDisclosure(false)

  return (
    <Stack h='100%'>
      <OneCModal close={closeImport} opened={openedImport} />
      <ActionIcon
        variant='gradient'
        onClick={open}
        mx='auto'
        size='xl'
        radius='xl'
      >
        <IconPlus />
      </ActionIcon>
      <Drawer opened={opened} onClose={close}>
        <DrawerContent closeDrawer={close} />
      </Drawer>
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
      <Button onClick={openImport} variant='transparent'>
        Импорт из 1С
      </Button>
    </Stack>
  )
}
