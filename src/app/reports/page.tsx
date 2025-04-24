'use client'

import { Grid, SimpleGrid, Stack } from '@mantine/core'
import { MostPopularCard } from '../components/reports/most-popular'
import { DonutCategoriesChart } from '../components/reports/donut-categories-chart'
import { TodaysEarningCard } from '../components/reports/todays-earning-chart'
import { TodaysSpendingCard } from '../components/reports/todays-spendings-chart'
import { useMediaQuery } from '@mantine/hooks'
import { ApproximateChart } from '../components/reports/approximate-chart'

const ReportsPage = () => {
  const isMobile = useMediaQuery('(max-width: 1000px)')

  return (
    <Stack>
      <Grid>
        <Grid.Col span={isMobile ? 12 : 8}>
          <MostPopularCard />
        </Grid.Col>
        <Grid.Col span={isMobile ? 12 : 4}>
          <DonutCategoriesChart />
        </Grid.Col>
      </Grid>
      <SimpleGrid cols={isMobile ? 1 : 2}>
        <TodaysEarningCard />
        <TodaysSpendingCard />
      </SimpleGrid>
      <SimpleGrid cols={isMobile ? 1 : 2}>
        <ApproximateChart />
      </SimpleGrid>
    </Stack>
  )
}

export default ReportsPage
