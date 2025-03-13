'use client'

import { SimpleGrid, Stack } from '@mantine/core'
import { MostPopularCard } from '../components/reports/most-popular'
import { DonutCategoriesChart } from '../components/reports/donut-categories-chart'

const ReportsPage = () => {
  return (
    <Stack>
      <SimpleGrid cols={2}>
        <MostPopularCard />
        <DonutCategoriesChart />
      </SimpleGrid>
    </Stack>
  )
}

export default ReportsPage
