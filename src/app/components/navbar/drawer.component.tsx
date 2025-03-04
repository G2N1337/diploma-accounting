import { useAccountChangeTypes } from '@/utils/requests/get-all-types'
import {
  Button,
  Group,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import {
  IconCalendar,
  IconCirclePlusFilled,
  IconCurrencyRubel,
} from '@tabler/icons-react'
import React, { useState } from 'react'

export const DrawerContent = () => {
  const [value, setValue] = useState<Date | null>(null)

  const { data } = useAccountChangeTypes()

  const controls = data.data?.map((item) => {
    return { label: item?.name, value: item?._id }
  })

  return (
    <form>
      <Stack gap={24} w='100%' align='stretch' px={12} mt={48}>
        {controls && <SegmentedControl data={controls} />}
        <TextInput
          placeholder='Сколько потрачено/получено?'
          leftSection={<IconCurrencyRubel />}
        />

        <DateInput
          placeholder='Выберите дату'
          leftSection={<IconCalendar />}
          value={value}
          onChange={setValue}
        />
        <Button type='submit' variant='gradient'>
          <Group gap='xs'>
            <IconCirclePlusFilled /> <Text>Добавить</Text>
          </Group>
        </Button>
      </Stack>
    </form>
  )
}
