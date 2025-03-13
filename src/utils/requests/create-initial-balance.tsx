import { useMutation } from '@tanstack/react-query'
import axiosClient from './axios/client'

const postNewAccountPosition = async (payload: {
  balance: number
}): Promise<{
  data: { balance: number }
  success: boolean
}> => {
  const { data } = await axiosClient.post<{
    data: { balance: number }
    success: boolean
  }>('/api/create-initial-balance', payload)

  return data
}

export const useCreateInitialBalance = () => {
  return useMutation<
    {
      data: { balance: number } | undefined
      success: boolean
    },
    unknown,
    { balance: number }
  >({
    mutationFn: postNewAccountPosition,
  })
}
