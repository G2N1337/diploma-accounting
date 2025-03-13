'use client'

import { useUserAccountPositions } from '@/utils/requests/get-all-user-positions'
import {
  ActionIcon,
  Group,
  Pill,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import React from 'react'
import { PositionCard } from './components/position-card'
import { useAccountChangeTypes } from '@/utils/requests/get-all-types'
import { useSearchParams } from 'next/navigation'
import { useQueryString } from '@/utils/create-query-string'
import { useExpenseCategories } from '@/utils/requests/get-all-categories'
import { IconPlus } from '@tabler/icons-react'
import { useGetUserBalance } from '@/utils/requests/get-users-balance'

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
  const {
    data: { balance },
  } = useGetUserBalance()

  return (
    <>
      {balance !== null && (
        <Title mb={24} fw='normal' order={2}>
          Ваш текущий баланс:{' '}
          <Pill bg='blue.2' size='xl'>
            <Text
              fw='bolder'
              style={{
                backgroundImage: 'linear-gradient(red, blue)',
                color: 'transparent',
                backgroundClip: 'text',
              }}
              span
            >
              {balance?.toLocaleString('ru-RU')}₽
            </Text>
          </Pill>
        </Title>
      )}
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
            placeholder='Фильтры по типу операций'
            onChange={(e) => handleSelectFilter(e, 'type')}
            data={[{ value: '', label: 'Все' }, ...changeTypeControls]}
          />

          <Select
            radius='lg'
            placeholder='Фильтры по категориям'
            onChange={(e) => handleSelectFilter(e, 'category')}
            data={[{ value: '', label: 'Все' }, ...expenseCategoriesControls]}
          />
        </SimpleGrid>
      </Stack>

      <Stack>
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
      </Stack>
    </>
  )
}

export default DashboardPage
