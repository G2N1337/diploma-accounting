import { useQuery } from '@tanstack/react-query'

import axiosClient from './axios/client'
import { ExpenseCategoriesType } from '../schemas/expense-categories'

export type CommonCategoriesType = {
  data: {
    _id: string
    count: number
    categoryData: ExpenseCategoriesType
  }[]
  success: boolean
}

const fetchCommonCategories = async (): Promise<CommonCategoriesType> => {
  const { data } = await axiosClient.get<CommonCategoriesType>(
    '/api/get-most-popular-category'
  )

  return data
}

export const useMostCommonCategories = () => {
  return useQuery<CommonCategoriesType>({
    queryKey: ['common-categories'],
    initialData: { data: [], success: false },
    queryFn: fetchCommonCategories,
  })
}
