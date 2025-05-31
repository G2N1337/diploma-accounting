import { useExpenseCategories } from '@/utils/requests/get-all-categories'
import { useAccountChangeTypes } from '@/utils/requests/get-all-types'
import { Button, Group, Stack, Text } from '@mantine/core'
import {
  IconBubbleText,
  IconCalendar,
  IconCheck,
  IconCurrencyRubel,
  IconShoppingBagPlus,
} from '@tabler/icons-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Select } from '../ui-form/Select'
import { DateInput } from '../ui-form/DateInput'
import { SegmentedControl } from '../ui-form/SegmentedControl'
import { zodResolver } from '@hookform/resolvers/zod'
import { AccountingSchema, AccountingType } from './validation'
import { NumberInput } from '../ui-form/NumberInput'
import { TextInput } from '../ui-form/TextInput'
import { useNewAccountPosition } from '@/utils/requests/create-account-position'
import { notifications } from '@mantine/notifications'
import { useQueryClient } from '@tanstack/react-query'
import { useGetUserBalance } from '@/utils/requests/get-users-balance'

const SelectWalletRenderOption = ({
  option,
  checked,
}: {
  option: { label: string; balance: number; value: string }
  checked: boolean
}) => {
  return (
    <Group flex='1' gap='xs'>
      <Stack gap={2}>
        <Text size='sm'>{option.label}</Text>
        <Text
          fw='bold'
          size='xs'
          style={{
            backgroundImage: 'linear-gradient(red, blue)',
            color: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {option.balance}₽
        </Text>
      </Stack>
      {checked && <IconCheck style={{ marginInlineStart: 'auto' }} />}
    </Group>
  )
}

export const DrawerContent: React.FC<{ closeDrawer: () => void }> = ({
  closeDrawer,
}) => {
  const { data } = useAccountChangeTypes()

  const { data: expenseCategories } = useExpenseCategories()

  const {
    data: { wallets },
  } = useGetUserBalance()

  const queryClient = useQueryClient()

  const changeTypeControls = data.data?.map((item) => {
    return { label: item?.name, value: item?._id }
  })

  const expenseCategoriesControls = expenseCategories.data?.map((item) => {
    return { label: item?.label, value: item?._id }
  })

  const createNewAccountPosition = useNewAccountPosition()

  const { control, handleSubmit } = useForm<AccountingType>({
    resolver: zodResolver(AccountingSchema),
    defaultValues: {
      amount: undefined,
      category: '',
      date: new Date(),
      type: '',
      wallet: '',
      comment: '',
    },
  })

  const submitForm = (values: AccountingType) => {
    createNewAccountPosition.mutate(values, {
      onSuccess: () => {
        notifications.show({
          message: `Позиция на сумму ${values.amount}₽ создана!`,
          color: 'green',
        })

        queryClient.invalidateQueries({
          queryKey: ['get-user-positions'],
        })

        queryClient.invalidateQueries({
          queryKey: ['user-balance'],
        })

        closeDrawer()
      },
    })

    return values
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Stack gap={24} w='100%' align='stretch' px={12} mt={48}>
        {changeTypeControls && (
          <SegmentedControl
            name='type'
            control={control}
            data={changeTypeControls}
          />
        )}

        <Select
          placeholder='Выберите счет'
          name='wallet'
          data={wallets?.map((wallet) => {
            return {
              label: `${wallet.name}`,
              value: wallet._id,
              balance: wallet.balance,
            }
          })}
          control={control}
          //@ts-expect-error: idc
          renderOption={SelectWalletRenderOption}
        />

        {expenseCategoriesControls && (
          <Select
            searchable
            control={control}
            name='category'
            data={expenseCategoriesControls}
            placeholder='Выберите категорию трат'
            leftSection={<IconShoppingBagPlus />}
          />
        )}

        <NumberInput
          name='amount'
          control={control}
          placeholder='Сколько потрачено/получено?'
          leftSection={<IconCurrencyRubel />}
        />

        <DateInput
          name='date'
          control={control}
          placeholder='Выберите дату'
          leftSection={<IconCalendar />}
        />

        <TextInput
          name='comment'
          control={control}
          placeholder='Напишите комментарий (необязательно)'
          leftSection={<IconBubbleText />}
        />

        <Button type='submit' variant='gradient'>
          Добавить операцию
        </Button>
      </Stack>
    </form>
  )
}
