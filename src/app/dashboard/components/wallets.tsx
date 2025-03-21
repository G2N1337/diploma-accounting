import { useGetUserBalance } from '@/utils/requests/get-users-balance'
import {
  Avatar,
  Card,
  Pill,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import React from 'react'
import { MiniWalletCard } from './mini-wallet-card'
import { IconPlus } from '@tabler/icons-react'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { CreateNewAccountModal } from '@/app/components/create-new-account'

export const Wallets = () => {
  const [opened, { open, close }] = useDisclosure(false)

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
          <Title fw='normal' order={2}>
            Общий баланс:{' '}
            <Pill bg='blue.2' size='xl'>
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
          </Title>
          <SimpleGrid cols={isMobile ? 2 : 9}>
            {wallets?.map((wallet) => {
              return <MiniWalletCard key={wallet._id} wallet={wallet} />
            })}
            <Card
              shadow='xl'
              radius='lg'
              onClick={open}
              style={{ cursor: 'pointer' }}
            >
              <Stack justify='center' h='100%' align='center' gap={6}>
                <Avatar>
                  <IconPlus />
                </Avatar>
                <Text size='sm' c='gray.5'>
                  Новый счет...
                </Text>
              </Stack>
            </Card>
          </SimpleGrid>
        </Stack>
      )}
    </>
  )
}
