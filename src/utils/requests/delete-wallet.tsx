import { useMutation } from '@tanstack/react-query'
import axiosClient from './axios/client'

const postDeleteWallet = async (payload: {
  id: string
}): Promise<{
  data: { id: string }
  success: boolean
}> => {
  const { data } = await axiosClient.post<{
    data: { id: string }
    success: boolean
  }>('/api/delete-wallet', payload)

  return data
}

export const useDeleteWallet = () => {
  return useMutation<
    {
      data: { id: string } | undefined
      success: boolean
    },
    unknown,
    { id: string }
  >({
    mutationFn: postDeleteWallet,
  })
}
