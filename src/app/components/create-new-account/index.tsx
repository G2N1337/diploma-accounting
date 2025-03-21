import { Button, Flex, Modal, Stack, Title } from '@mantine/core'
import React from 'react'
import { useForm } from 'react-hook-form'
import { NumberInput } from '../ui-form/NumberInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconCurrencyRubel, IconForms } from '@tabler/icons-react'
import { useCreateInitialBalance } from '@/utils/requests/create-initial-balance'
import { useQueryClient } from '@tanstack/react-query'
import { TextInput } from '../ui-form/TextInput'
import { balanceObjectSchema } from './validation'

export const CreateNewAccountModal = ({
  opened,
  onClose,
}: {
  opened: boolean
  onClose: () => void
}) => {
  const queryClient = useQueryClient()

  const createInitialBalance = useCreateInitialBalance()

  const { control, handleSubmit, reset } = useForm({
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
        reset()
        onClose()
      },
    })
  }

  return (
    <Modal withCloseButton={false} opened={opened} onClose={onClose}>
      <Title order={3}>Создать новый счет!</Title>
      <Modal.Body>
        <Stack mt={24}>
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
              <Button type='submit'>Создать</Button>
            </Flex>
          </form>
        </Stack>
      </Modal.Body>
    </Modal>
  )
}
