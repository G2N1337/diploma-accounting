import { Card, Center, Title } from '@mantine/core'
import { DonutChart } from '@mantine/charts'
import { useMostCommonCategories } from '@/utils/requests/get-most-common-categories'
import { getUniqueMantineColor } from '@/utils/generate-random-color'

export const DonutCategoriesChart = () => {
  const { data } = useMostCommonCategories()

  if (!data.success) return null

  const mappedData = data.data.map((category, index: number) => {
    return {
      name: category.categoryData.label,
      value: category.count,
      color: getUniqueMantineColor(index),
    }
  })

  return (
    <Card mih={320} shadow='xl' radius='lg'>
      <Title order={2}>График категорий</Title>
      <Center h='100%' mt={20}>
        <DonutChart data={mappedData} />
      </Center>
    </Card>
  )
}
