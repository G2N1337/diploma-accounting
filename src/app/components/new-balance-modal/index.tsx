import { useGetUserBalance } from '@/utils/requests/get-users-balance'
import { Button, Flex, Modal, Stack, Text, Title } from '@mantine/core'
import React from 'react'
import { useForm } from 'react-hook-form'
import { NumberInput } from '../ui-form/NumberInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { balanceObjectSchema } from './validation'
import { IconCurrencyRubel } from '@tabler/icons-react'
import { useCreateInitialBalance } from '@/utils/requests/create-initial-balance'
import { useQueryClient } from '@tanstack/react-query'

export const NewBalanceModal = () => {
  const queryClient = useQueryClient()

  const {
    data: { balance },
  } = useGetUserBalance()

  const createInitialBalance = useCreateInitialBalance()

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(balanceObjectSchema),
  })

  const submit = (values: { balance: number }) => {
    createInitialBalance.mutate(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['user-balance'] })
      },
    })
  }

  return (
    <Modal withCloseButton={false} opened={balance === null} onClose={() => {}}>
      <Title order={3}>Введите ваш баланс на текущий момент</Title>
      <Modal.Body>
        <Stack mt={24}>
          <Text>
            Для начала работы с Coinly нужно ввести изначальный баланс
          </Text>
          <form onSubmit={handleSubmit(submit)}>
            <Flex gap={20} direction='column'>
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
