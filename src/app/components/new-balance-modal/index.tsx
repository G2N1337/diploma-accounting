import { useGetUserBalance } from '@/utils/requests/get-users-balance'
import { Button, Flex, Modal, Stack, Text, Title } from '@mantine/core'
import React from 'react'
import { useForm } from 'react-hook-form'
import { NumberInput } from '../ui-form/NumberInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { balanceObjectSchema } from './validation'
import { IconCurrencyRubel, IconForms } from '@tabler/icons-react'
import { useCreateInitialBalance } from '@/utils/requests/create-initial-balance'
import { useQueryClient } from '@tanstack/react-query'
import { TextInput } from '../ui-form/TextInput'

export const NewBalanceModal = () => {
  const queryClient = useQueryClient()

  const {
    data: { wallets },
  } = useGetUserBalance()

  const createInitialBalance = useCreateInitialBalance()

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(balanceObjectSchema),
    defaultValues: {
      balance: 0,
      name: '',
    },
  })

  const submit = (values: { name: string; balance: number }) => {
    createInitialBalance.mutate(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['user-balance'] })
      },
    })
  }

  return (
    <Modal
      withCloseButton={false}
      opened={wallets !== undefined && !wallets.length}
      onClose={() => {}}
    >
      <Title order={3}>Введите ваш баланс на текущий момент</Title>
      <Modal.Body>
        <Stack mt={24}>
          <Text>Для начала работы с Coinly нужно создать счет</Text>
          <form onSubmit={handleSubmit(submit)}>
            <Flex gap={20} direction='column'>
              <TextInput
                placeholder='Имя счета'
                leftSection={<IconForms />}
                control={control}
                name='name'
              />
              <NumberInput
                placeholder='Введите баланс'
                leftSection={<IconCurrencyRubel />}
                name='balance'
                control={control}
              />
              <Button type='submit'>Подтвердить</Button>
            </Flex>
          </form>
        </Stack>
      </Modal.Body>
    </Modal>
  )
}
