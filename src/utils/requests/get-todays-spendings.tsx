import { useQuery } from '@tanstack/react-query'

import axiosClient from './axios/client'

export type TodaysSpendingsType = {
  data: {
    _id: string
    count: number
    totalAmount: number
  }[]
  success: boolean
}

const fetchTodaysSpendings = async (): Promise<TodaysSpendingsType> => {
  const { data } = await axiosClient.get<TodaysSpendingsType>(
    '/api/get-todays-spendings'
  )

  return data
}

export const useGetTodaysSpendings = () => {
  return useQuery<TodaysSpendingsType>({
    queryKey: ['todays-spendings'],
    initialData: { data: [], success: false },
    queryFn: fetchTodaysSpendings,
  })
}
