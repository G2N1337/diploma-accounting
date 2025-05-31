import { useGetUserBalance } from '@/utils/requests/get-users-balance'
import { Button, Drawer, Group, SimpleGrid, Stack } from '@mantine/core'
import React from 'react'
import { MiniWalletCard } from './mini-wallet-card'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { CreateNewAccountModal } from '@/app/components/create-new-account'
import { DrawerContent } from '@/app/components/navbar/drawer.component'
import { IconPlus } from '@tabler/icons-react'

export const Wallets = () => {
  const [opened, { open, close }] = useDisclosure(false)

  const [openedDrawer, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false)

  const {
    data: { wallets, totalBalance },
    isSuccess,
  } = useGetUserBalance()

  const isMobile = useMediaQuery('(max-width: 1000px)')

  return (
    <>
      <CreateNewAccountModal opened={opened} onClose={close} />
      {isSuccess && (
        <Stack my={12}>
          <Group justify='space-between'>
            <Button onClick={open} variant='subtle'>
              Добавить счет
            </Button>
            <Button variant='white' onClick={openDrawer}>
              <IconPlus /> Новая операция
            </Button>
            <Drawer opened={openedDrawer} onClose={closeDrawer}>
              <DrawerContent closeDrawer={closeDrawer} />
            </Drawer>
          </Group>
          <SimpleGrid h={200} cols={isMobile ? 2 : 4}>
            <MiniWalletCard
              wallet={{
                _id: 'total',
                name: 'Общий баланс',
                balance: totalBalance || 0,
              }}
            />
            {wallets?.map((wallet) => {
              return <MiniWalletCard key={wallet._id} wallet={wallet} />
            })}
          </SimpleGrid>
        </Stack>
      )}
    </>
  )
}
