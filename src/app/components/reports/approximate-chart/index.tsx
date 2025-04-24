import { Card, Text, Title } from '@mantine/core'

export const ApproximateChart = () => {
  return (
    <Card mih={300} shadow='xl' radius='lg'>
      <Title order={2}>Прогноз на конец месяца</Title>
      <Text>Под конец месяца останется: 30000Р</Text>
    </Card>
  )
}
