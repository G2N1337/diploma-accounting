import { useGetTodaysEarnings } from '@/utils/requests/get-todays-earnings'
import { LineChart } from '@mantine/charts'
import { Card, Title } from '@mantine/core'
import { formatDate } from 'date-fns'
import React from 'react'

import { ru } from 'date-fns/locale'

export const TodaysEarningCard = () => {
  const { data } = useGetTodaysEarnings()

  const todaysEarningsData = data.data.map((earning) => {
    return {
      date: earning._id,
      totalAmount: earning.totalAmount,
    }
  })

  return (
    <Card shadow='xl' radius='lg'>
      <Card.Section p={20}>
        <Title order={2}>График пополнений</Title>
      </Card.Section>
      <LineChart
        curveType='natural'
        withPointLabels
        data={todaysEarningsData}
        h={300}
        xAxisProps={{
          tickFormatter(value) {
            return formatDate(value, 'PPP', { locale: ru })
          },
        }}
        series={[
          {
            name: 'totalAmount',
            label: 'Сумма за день',
            color: 'teal.6',
          },
        ]}
        dataKey='date'
      />
    </Card>
  )
}
