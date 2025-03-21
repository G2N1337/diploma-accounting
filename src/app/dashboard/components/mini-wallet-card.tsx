import { useDeleteWallet } from '@/utils/requests/delete-wallet'
import { WalletType } from '@/utils/types/wallet'
import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  LoadingOverlay,
  Popover,
  Stack,
  Text,
} from '@mantine/core'
import { IconDots, IconPigFilled } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import React from 'react'

export const MiniWalletCard = ({ wallet }: { wallet: WalletType }) => {
  const deleteWallet = useDeleteWallet()

  const queryClient = useQueryClient()

  const handleDelete = (id: string) => {
    deleteWallet.mutate(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['user-balance'] })
        },
      }
    )
  }

  return (
    <Card shadow='xl' radius='lg'>
      <Popover>
        <Popover.Target>
          <ActionIcon pos='absolute' right={16} variant='transparent'>
            <IconDots />
          </ActionIcon>
        </Popover.Target>
        <Popover.Dropdown>
          <Stack>
            <Text size='xs' c='gray.5'>
              Настройки счета
            </Text>
            <Button
              onClick={() => handleDelete(wallet._id)}
              variant='transparent'
              c='red.5'
            >
              Удалить счет
            </Button>
          </Stack>
          <LoadingOverlay visible={deleteWallet.isPending} />
        </Popover.Dropdown>
      </Popover>
      <Stack align='center' gap={2}>
        <Avatar>
          <IconPigFilled />
        </Avatar>
        <Text
          size='lg'
          fw='bold'
          style={{
            backgroundImage: 'linear-gradient(red, blue)',
            color: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {wallet.balance?.toLocaleString('ru-RU')} ₽
        </Text>
        <Text size='xs'>{wallet.name}</Text>
      </Stack>
    </Card>
  )
}
