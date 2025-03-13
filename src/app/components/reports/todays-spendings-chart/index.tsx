import { LineChart } from '@mantine/charts'
import { Card, Title } from '@mantine/core'
import { formatDate } from 'date-fns'
import React from 'react'

import { ru } from 'date-fns/locale'
import { useGetTodaysSpendings } from '@/utils/requests/get-todays-spendings'

export const TodaysSpendingCard = () => {
  const { data } = useGetTodaysSpendings()

  const todaysSpendingData = data.data.map((earning) => {
    return {
      date: earning._id,
      totalAmount: earning.totalAmount,
    }
  })

  return (
    <Card shadow='xl' radius='lg'>
      <Card.Section p={20}>
        <Title order={2}>График расходов</Title>
      </Card.Section>
      <LineChart
        curveType='natural'
        withPointLabels
        data={todaysSpendingData}
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
            color: 'red.6',
          },
        ]}
        dataKey='date'
      />
    </Card>
  )
}
