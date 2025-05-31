import { Avatar, Button, Group, Stack } from '@mantine/core'
import React from 'react'
import { useDisclosure } from '@mantine/hooks'
import Link from 'next/link'
import { OneCModal } from './import-1c-excel.component'
import { IconChevronRight, IconCube, IconKey } from '@tabler/icons-react'

export const Navbar = () => {
  const [openedImport, { open: openImport, close: closeImport }] =
    useDisclosure(false)

  return (
    <Stack h='100%' align='start'>
      <OneCModal close={closeImport} opened={openedImport} />
      <Button variant='transparent'>
        <Link
          style={{
            color: 'var(--mantine-color-blue-6)',
            textDecoration: 'none',
          }}
          href='/dashboard'
        >
          <Group align='center'>
            <Avatar size='sm' color='blue'>
              <IconKey size={16} />
            </Avatar>
            Главная <IconChevronRight size={14} />
          </Group>
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
          <Group align='center'>
            <Avatar size='sm' color='blue'>
              <IconCube size={16} />
            </Avatar>
            Отчеты <IconChevronRight size={14} />
          </Group>
        </Link>
      </Button>
      <Button onClick={openImport} variant='transparent'>
        Импорт из 1С
      </Button>
    </Stack>
  )
}
