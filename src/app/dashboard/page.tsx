'use client'

import { useUserAccountPositions } from '@/utils/requests/get-all-user-positions'
import { Select, SimpleGrid, Stack, Text } from '@mantine/core'
import React from 'react'
import { PositionCard } from './components/position-card'
import { useAccountChangeTypes } from '@/utils/requests/get-all-types'
import { useSearchParams } from 'next/navigation'
import { useQueryString } from '@/utils/create-query-string'
import { useExpenseCategories } from '@/utils/requests/get-all-categories'

const DashboardPage = () => {
  const searchParams = useSearchParams()

  const { data } = useUserAccountPositions(searchParams.toString())

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
      <Text
        size='xl'
        mb={12}
        style={{
          fontSize: 36,
          fontWeight: 100,
        }}
      >
        Ваши последние операции
      </Text>
      <Stack mb={12}>
        <Text>Фильтры</Text>
        <SimpleGrid cols={2}>
          <Select
            placeholder='Фильтры по типу операций'
            onChange={(e) => handleSelectFilter(e, 'type')}
            data={[{ value: '', label: 'Все' }, ...changeTypeControls]}
          />

          <Select
            placeholder='Фильтры по категориям'
            onChange={(e) => handleSelectFilter(e, 'category')}
            data={[{ value: '', label: 'Все' }, ...expenseCategoriesControls]}
          />
        </SimpleGrid>
      </Stack>

      <Stack>
        {data.data.map((position) => {
          return <PositionCard position={position} key={position._id} />
        })}
      </Stack>
    </>
  )
}

export default DashboardPage
