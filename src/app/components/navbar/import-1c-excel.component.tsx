import {
  Button,
  FileInput,
  Flex,
  Modal,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import React from 'react'
import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
import { IconForms } from '@tabler/icons-react'
import { useCreateInitialBalance } from '@/utils/requests/create-initial-balance'
import { useQueryClient } from '@tanstack/react-query'
import { useNewAccountPosition } from '@/utils/requests/create-account-position'
import { getPastDate } from '@/utils/getPastDate'
import { notifications } from '@mantine/notifications'

export const OneCModal = ({
  opened,
  close,
}: {
  opened: boolean
  close: () => void
}) => {
  const queryClient = useQueryClient()

  const createInitialBalance = useCreateInitialBalance()

  const createNewAccountPosition = useNewAccountPosition()

  const { handleSubmit } = useForm({
    defaultValues: {
      balance: 0,
      name: '',
    },
  })

  const submit = (values: { name: string; balance: number }) => {
    createNewAccountPosition.mutate({
      amount: 5000,
      category: '67d133eebf3e130ccd80f996',
      date: getPastDate({ endOfDay: true, daysAgo: 1 }),
      type: '67c65ee94d4684df26e04081',
      wallet: '67ddac06b6ec1495fd9b862e',
      comment: '',
    })

    createNewAccountPosition.mutate({
      amount: 8000,
      category: '67d133eebf3e130ccd80f99a',
      date: getPastDate({ startOfDay: true, daysAgo: 2 }),
      type: '67c65ee94d4684df26e04081',
      wallet: '67ddac06b6ec1495fd9b862e',
      comment: '',
    })

    createNewAccountPosition.mutate({
      amount: 12000,
      category: '67d133eebf3e130ccd80f997',
      date: getPastDate({ startOfDay: true, daysAgo: 4 }),
      type: '67c65ee94d4684df26e04080',
      wallet: '67ddac06b6ec1495fd9b862e',
      comment: '',
    })

    createNewAccountPosition.mutate({
      amount: 30000,
      category: '67d133eebf3e130ccd80f997',
      date: getPastDate({ startOfDay: true, daysAgo: 2 }),
      type: '67c65ee94d4684df26e04081',
      wallet: '67ddac06b6ec1495fd9b862e',
      comment: '',
    })

    createNewAccountPosition.mutate(
      {
        amount: 12000,
        category: '67d133eebf3e130ccd80f999',
        date: getPastDate({ startOfDay: true, daysAgo: 3 }),
        type: '67c65ee94d4684df26e04080',
        wallet: '67ddac06b6ec1495fd9b862e',
        comment: '',
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['get-user-positions'],
          })

          notifications.show({
            message: `Документ успешно импортирован!`,
            color: 'green',
          })

          close()
        },
      }
    )

    createInitialBalance.mutate(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['user-balance'] })
      },
    })
  }

  return (
    <Modal withCloseButton={false} opened={opened} onClose={close}>
      <Title order={3}>Импорт выписки из 1С</Title>
      <Modal.Body>
        <Stack mt={24}>
          <Text>
            Импортировать выписку из 1С для автоматического добавления операций
          </Text>
          <form onSubmit={handleSubmit(submit)}>
            <Flex gap={20} direction='column'>
              <FileInput
                placeholder='Выписка из 1С (в формате excel)'
                leftSection={<IconForms />}
                name='name'
              />
              <Button type='submit'>Подтвердить</Button>
            </Flex>
          </form>
        </Stack>
      </Modal.Body>
    </Modal>
  )
}
