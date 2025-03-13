import { AccountPosition } from '@/utils/schemas/account-position'
import { Card, Flex, Stack, Text } from '@mantine/core'
import { format } from 'date-fns'
import React from 'react'
import { ru } from 'date-fns/locale'

export const PositionCard: React.FC<{ position: AccountPosition }> = ({
  position,
}) => {
  return (
    <Card shadow='xl' radius='lg' mih={150}>
      <Flex direction='column' gap={12}>
        <Text size='xs' mb='auto' mr='auto'>
          {format(position.date, 'PP в pp', { locale: ru })}
        </Text>
        <Stack gap={12}>
          <Text>
            Вы совершили операцию{' '}
            <Text c={position.type.color} span>
              {position.type.name}
            </Text>{' '}
            на сумму &#x20bd;
            {position.amount.toLocaleString('ru-RU')} по категории &ldquo;
            {position.category.label}
            &rdquo;
          </Text>
          {position.comment && (
            <Text mt={12}>Вы оставили комментарий: {position.comment}</Text>
          )}
        </Stack>
      </Flex>
    </Card>
  )
}
