import { useQuery } from '@tanstack/react-query'

import axiosClient from './axios/client'
import { ExpenseCategoriesType } from '../schemas/expense-categories'

const fetchExpenseCategories = async (): Promise<{
  data: ExpenseCategoriesType[]
  success: boolean
}> => {
  const { data } = await axiosClient.get<{
    data: ExpenseCategoriesType[]
    success: boolean
  }>('/api/expense-categories')

  return data
}

export const useExpenseCategories = () => {
  return useQuery<{
    data: ExpenseCategoriesType[]
    success: boolean
  }>({
    queryKey: ['get-expense-categories'],
    initialData: { data: [], success: false },
    queryFn: fetchExpenseCategories,
  })
}
