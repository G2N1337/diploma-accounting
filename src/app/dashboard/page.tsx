'use client'

import { Card, Group, Select, Text } from '@mantine/core'
import React from 'react'
import { useAccountChangeTypes } from '@/utils/requests/get-all-types'
import { useQueryString } from '@/utils/create-query-string'
import { useExpenseCategories } from '@/utils/requests/get-all-categories'
import { Wallets } from './components/wallets'
import { TransactionsTable } from './components/transactions-table'

const DashboardPage = () => {
  const { data: types } = useAccountChangeTypes()

  const { data: expenseCategories } = useExpenseCategories()

  const createParams = useQueryString()

  const changeTypeControls = types.data?.map((item) => {
    return { label: item?.name, value: item?._id }
  })

  const expenseCategoriesControls = expenseCategories.data?.map((item) => {
    return { label: item?.label, value: item?._id }
  })

  const handleSelectFilter = (value: string | null, type: string) => {
    createParams(type, value ?? '')
  }

  return (
    <>
      <Wallets />
      <Card radius='lg'>
        <Group justify='space-between' mb={12}>
          <Text
            size='xl'
            mb={12}
            style={{
              fontSize: 24,
            }}
          >
            Последние операции
          </Text>
          <Group>
            <Select
              variant='filled'
              placeholder='Тип операции'
              onChange={(e) => handleSelectFilter(e, 'type')}
              data={[{ value: '', label: 'Все' }, ...changeTypeControls]}
            />

            <Select
              variant='filled'
              placeholder='Категория'
              onChange={(e) => handleSelectFilter(e, 'category')}
              data={[{ value: '', label: 'Все' }, ...expenseCategoriesControls]}
            />
          </Group>
        </Group>
        <TransactionsTable />
      </Card>
    </>
  )
}

export default DashboardPage
