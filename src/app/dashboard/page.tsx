'use client'

import { useUserAccountPositions } from '@/utils/requests/get-all-user-positions'
import { Stack, Text } from '@mantine/core'
import React from 'react'
import { PositionCard } from './components/position-card'

const DashboardPage = () => {
  const { data } = useUserAccountPositions()

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
      <Stack>
        {data.data.map((position) => {
          return <PositionCard position={position} key={position._id} />
        })}
      </Stack>
    </>
  )
}

export default DashboardPage
