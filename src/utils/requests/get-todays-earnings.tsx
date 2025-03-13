import { useQuery } from '@tanstack/react-query'

import axiosClient from './axios/client'

export type TodaysEarningsType = {
  data: {
    _id: string
    count: number
    totalAmount: number
  }[]
  success: boolean
}

const fetchTodaysEarnings = async (): Promise<TodaysEarningsType> => {
  const { data } = await axiosClient.get<TodaysEarningsType>(
    '/api/get-todays-earnings'
  )

  return data
}

export const useGetTodaysEarnings = () => {
  return useQuery<TodaysEarningsType>({
    queryKey: ['todays-earnings'],
    initialData: { data: [], success: false },
    queryFn: fetchTodaysEarnings,
  })
}
