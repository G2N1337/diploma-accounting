import { useQueryString } from '@/utils/create-query-string'
import pluralize from '@/utils/pluralize'
import { useUserAccountPositions } from '@/utils/requests/get-all-user-positions'
import { AccountPosition } from '@/utils/schemas/account-position'
import { Group, Pagination, Table, Text } from '@mantine/core'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { useSearchParams } from 'next/navigation'
import React from 'react'
const TableRow = ({ transaction }: { transaction: AccountPosition }) => {
  return (
    <Table.Tr>
      <Table.Td>{transaction.type.name}</Table.Td>
      <Table.Td>{transaction.category.label}</Table.Td>
      <Table.Td>{transaction.amount}</Table.Td>
      <Table.Td>{format(transaction.date, 'PP в pp', { locale: ru })}</Table.Td>
      <Table.Td>{transaction.comment ? transaction.comment : '-'}</Table.Td>
    </Table.Tr>
  )
}
export const TransactionsTable = () => {
  const searchParams = useSearchParams()

  const createParams = useQueryString()

  const page = searchParams.get('page')

  const handleSelectFilter = (value: string | null, type: string) => {
    createParams(type, value ?? '')
  }

  const { data, isLoading } = useUserAccountPositions(searchParams.toString())
  if (isLoading) {
    return <div>Загрузка...</div>
  }

  return (
    <>
      <Table withRowBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Тип операции</Table.Th>
            <Table.Th>Категория</Table.Th>
            <Table.Th>Сумма</Table.Th>
            <Table.Th>Дата</Table.Th>
            <Table.Th>Комментарий</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.data.map((transaction) => {
            return <TableRow transaction={transaction} key={transaction._id} />
          })}
        </Table.Tbody>
      </Table>
      <Group justify='space-between' mt={12}>
        <Group>
          <Text size='sm' c='gray'>
            Страница{' '}
            <Text span fw='bold'>
              {page} из {data.pagination.totalPages}
            </Text>
          </Text>
          <Text size='sm' c='gray'>
            Всего{' '}
            <Text span fw='bold'>
              {data.pagination.total}{' '}
              {pluralize(data.pagination.total, [
                'операция',
                'операции',
                'операций',
              ])}
            </Text>
          </Text>
        </Group>
        <Pagination
          variant=''
          total={data.pagination.totalPages}
          onChange={(e) => handleSelectFilter(e.toString(), 'page')}
        />
      </Group>
    </>
  )
}
