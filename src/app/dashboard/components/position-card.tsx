import { AccountPosition } from '@/utils/schemas/account-position'
import { Card, Flex, Group, Stack, Text } from '@mantine/core'
import { format } from 'date-fns'
import React from 'react'
import { ru } from 'date-fns/locale'
import { AccountChangeTypeEnum } from '@/utils/enums/account-change-type'

export const PositionCard: React.FC<{ position: AccountPosition }> = ({
  position,
}) => {
  return (
    <Card shadow='xl' radius='lg' mih={150}>
      <Flex direction='column' gap={12}>
        <Text size='xs' mb='auto' mr='auto'>
          {format(position.date, 'PP в pp', { locale: ru })}
        </Text>

        <Group justify='space-between'>
          <Stack gap={2}>
            <Text size={'24px'} mb='auto' mr='auto'>
              Операция по категории{' '}
              <Text span fw='bold'>
                {' '}
                {position.category.label}
              </Text>
            </Text>
            {position.comment && (
              <Text mt={12}>Комментарий: {position.comment}</Text>
            )}
          </Stack>
          <Text
            size={'36px'}
            fw='bolder'
            style={{
              color: position.type.color,
            }}
            mb='auto'
            ml='auto'
          >
            {position.type.name === AccountChangeTypeEnum.Expense && '-'}{' '}
            {position.amount.toLocaleString('ru-RU')} &#x20bd;
          </Text>
        </Group>
      </Flex>
    </Card>
  )
}
