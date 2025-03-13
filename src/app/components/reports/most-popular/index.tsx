import { formatRaz } from '@/utils/formatRaz'
import { useMostCommonCategories } from '@/utils/requests/get-most-common-categories'
import { ExpenseCategoriesType } from '@/utils/schemas/expense-categories'
import { Card, CardSection, List, Text, Title } from '@mantine/core'

const renderCategoryText = (
  category: { categoryData: ExpenseCategoriesType; count: number },
  index: number
) => {
  if (index === 0) {
    return (
      <Text size='xl'>
        Ваша самая популярная категория —{' '}
        <Text fw='bold' span>
          {category.categoryData.label}
        </Text>
        , всего операций по данной категории было совершено{' '}
        <Text span fw='bold'>
          {formatRaz(category.count)}
        </Text>
      </Text>
    )
  }
  return (
    <Text>
      Категория —{' '}
      <Text fw='bold' span>
        {category.categoryData.label}
      </Text>
      , {formatRaz(category.count)}
    </Text>
  )
}

export const MostPopularCard = () => {
  const { data } = useMostCommonCategories()

  return (
    <Card shadow='xl' radius='lg'>
      <Card.Section px={20}>
        <Title order={2}>Самые частые категории</Title>
      </Card.Section>
      <CardSection p={20}>
        <List type='ordered' spacing='md'>
          {data.data.map((category, index) => {
            return (
              <List.Item key={category._id}>
                {renderCategoryText(category, index)}
              </List.Item>
            )
          })}
        </List>
      </CardSection>
    </Card>
  )
}
