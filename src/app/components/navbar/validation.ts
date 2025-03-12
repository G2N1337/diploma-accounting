import { AccountChangeTypeEnum } from '@/utils/enums/account-change-type'
import { z } from 'zod'

export type AccountingType = {
  type: AccountChangeTypeEnum
  amount: number
  category: string
  comment?: string
  date: Date
}

export const AccountingSchema = z.object({
  type: z.nativeEnum(AccountChangeTypeEnum),
  amount: z.number().min(1),
  comment: z.string().optional(),
  category: z.string().min(1),
  date: z.date(),
})
