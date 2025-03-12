import { useExpenseCategories } from '@/utils/requests/get-all-categories'
import { useAccountChangeTypes } from '@/utils/requests/get-all-types'
import { Button, Group, Stack, Text } from '@mantine/core'
import {
  IconBubbleText,
  IconCalendar,
  IconCirclePlusFilled,
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

export const DrawerContent: React.FC<{ closeDrawer: () => void }> = ({
  closeDrawer,
}) => {
  const { data } = useAccountChangeTypes()

  const { data: expenseCategories } = useExpenseCategories()

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
      comment: '',
    },
  })

  const submitForm = (values: AccountingType) => {
    createNewAccountPosition.mutate(values, {
      onSuccess: () => {
        notifications.show({
          message: `Позиция на сумму ₽${values.amount} создана!`,
          color: 'green',
        })

        queryClient.invalidateQueries({ queryKey: ['get-user-positions'] })

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
          <Group gap='xs'>
            <IconCirclePlusFilled /> <Text>Добавить</Text>
          </Group>
        </Button>
      </Stack>
    </form>
  )
}
