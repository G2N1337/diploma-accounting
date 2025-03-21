'use client'

import { useUserAccountPositions } from '@/utils/requests/get-all-user-positions'
import {
  ActionIcon,
  Group,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from '@mantine/core'
import React from 'react'
import { PositionCard } from './components/position-card'
import { useAccountChangeTypes } from '@/utils/requests/get-all-types'
import { useSearchParams } from 'next/navigation'
import { useQueryString } from '@/utils/create-query-string'
import { useExpenseCategories } from '@/utils/requests/get-all-categories'
import { IconPlus } from '@tabler/icons-react'
import { Wallets } from './components/wallets'

const DashboardPage = () => {
  const searchParams = useSearchParams()

  const { data, isLoading } = useUserAccountPositions(searchParams.toString())

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
      <Text
        size='xl'
        mb={12}
        style={{
          fontSize: 24,
        }}
      >
        Ваши последние операции
      </Text>
      <Stack mb={12}>
        <SimpleGrid cols={2}>
          <Select
            radius='lg'
            placeholder='Тип операции'
            onChange={(e) => handleSelectFilter(e, 'type')}
            data={[{ value: '', label: 'Все' }, ...changeTypeControls]}
          />

          <Select
            radius='lg'
            placeholder='Категория'
            onChange={(e) => handleSelectFilter(e, 'category')}
            data={[{ value: '', label: 'Все' }, ...expenseCategoriesControls]}
          />
        </SimpleGrid>
      </Stack>

      <SimpleGrid cols={1}>
        {data.data.length > 0 ? (
          data.data.map((position) => {
            return <PositionCard position={position} key={position._id} />
          })
        ) : (
          <Group align='center' mt={24} justify='center'>
            <Text size='xl' fw='bold'>
              {isLoading ? (
                ''
              ) : (
                <>
                  Пока здесь ничего нет! Вы можете начать работу с приложением
                  нажав на
                  <ActionIcon
                    mx={12}
                    variant='gradient'
                    style={{
                      pointerEvents: 'none',
                    }}
                    size='xl'
                    radius='xl'
                  >
                    <IconPlus />
                  </ActionIcon>
                  слева!
                </>
              )}
            </Text>
          </Group>
        )}
      </SimpleGrid>
    </>
  )
}

export default DashboardPage
