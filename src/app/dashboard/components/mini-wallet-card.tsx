import { useDeleteWallet } from '@/utils/requests/delete-wallet'
import { WalletType } from '@/utils/types/wallet'
import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Flex,
  LoadingOverlay,
  Popover,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { IconDots, IconWallet } from '@tabler/icons-react'
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
  const isAccountCard = wallet.user

  const theme = useMantineTheme()

  return (
    <Card
      bg={isAccountCard ? 'white' : 'transparent'}
      w={300}
      h='100%'
      withBorder
      style={{
        borderColor: !isAccountCard
          ? theme.colors.blue[6]
          : theme.colors.gray[3],
      }}
      radius='lg'
    >
      {isAccountCard && (
        <Popover>
          <Popover.Target>
            <ActionIcon pos='absolute' right={16} variant='transparent'>
              <IconDots />
            </ActionIcon>
          </Popover.Target>
          <Popover.Dropdown>
            <Stack align='center'>
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
      )}
      <Flex justify='center' direction='column' h='100%' gap={2}>
        <Avatar color={!isAccountCard ? 'blue' : 'green'} size='lg' mb={12}>
          <IconWallet />
        </Avatar>
        <Text size='xs' c='blue'>
          {wallet.name}
        </Text>
        <Text size={'36px'} fw='bold'>
          {wallet.balance?.toLocaleString('ru-RU')}₽
        </Text>
      </Flex>
    </Card>
  )
}
