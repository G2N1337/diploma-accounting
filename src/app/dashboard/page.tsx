'use client'

import { useUserAccountPositions } from '@/utils/requests/get-all-user-positions'
import { Select, Stack, Text } from '@mantine/core'
import React from 'react'
import { PositionCard } from './components/position-card'
import { useAccountChangeTypes } from '@/utils/requests/get-all-types'
import { useSearchParams } from 'next/navigation'
import { useQueryString } from '@/utils/create-query-string'

const DashboardPage = () => {
  const searchParams = useSearchParams()

  const { data } = useUserAccountPositions(searchParams.toString())

  const createParams = useQueryString()

  const { data: types } = useAccountChangeTypes()

  const changeTypeControls = types.data?.map((item) => {
    return { label: item?.name, value: item?._id }
  })

  const handleSelectFilter = (value: string | null) => {
    createParams('type', value ?? '')
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
        Ваши последние траты
      </Text>

      <Select
        onChange={handleSelectFilter}
        data={[{ value: '', label: 'Все' }, ...changeTypeControls]}
      />

      <Stack>
        {data.data.map((position) => {
          return <PositionCard position={position} key={position._id} />
        })}
      </Stack>
    </>
  )
}

export default DashboardPage
