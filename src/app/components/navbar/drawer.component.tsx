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
import { AccountChangeTypeEnum } from '@/utils/enums/account-change-type'
import { NumberInput } from '../ui-form/NumberInput'
import { TextInput } from '../ui-form/TextInput'
import { useNewAccountPosition } from '@/utils/requests/create-account-position'

export const DrawerContent = () => {
  const { data } = useAccountChangeTypes()

  const { data: expenseCategories } = useExpenseCategories()

  const controls = data.data?.map((item) => {
    return { label: item?.name, value: item?.name }
  })
  const createNewAccountPosition = useNewAccountPosition()
  const { control, handleSubmit } = useForm<AccountingType>({
    resolver: zodResolver(AccountingSchema),
    defaultValues: {
      amount: 0,
      category: '',
      date: new Date(),
      type: AccountChangeTypeEnum.Expense,
      comment: '',
    },
  })

  const submitForm = (values: AccountingType) => {
    createNewAccountPosition.mutate(values)
    return values
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Stack gap={24} w='100%' align='stretch' px={12} mt={48}>
        {controls && (
          <SegmentedControl name='type' control={control} data={controls} />
        )}

        {expenseCategories.data.length > 0 && (
          <Select
            control={control}
            name='category'
            data={expenseCategories.data}
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
