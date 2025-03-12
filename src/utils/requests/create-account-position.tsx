import { useMutation } from '@tanstack/react-query'
import axiosClient from './axios/client'
import { AccountPosition } from '../schemas/account-position'
import { AccountingType } from '@/app/components/navbar/validation'

const postNewAccountPosition = async (
  payload: AccountingType
): Promise<{
  data: AccountPosition
  success: boolean
}> => {
  const { data } = await axiosClient.post<{
    data: AccountPosition
    success: boolean
  }>('/api/account-position', payload)

  return data
}

export const useNewAccountPosition = () => {
  return useMutation<
    {
      data: AccountPosition | undefined
      success: boolean
    },
    unknown,
    AccountingType
  >({
    mutationFn: postNewAccountPosition,
  })
}
