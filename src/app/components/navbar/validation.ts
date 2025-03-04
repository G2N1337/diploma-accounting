import { AccountChangeTypeEnum } from '@/utils/schemas/account-change-type'
import { z } from 'zod'

export const AccountingSchema = z.object({
  type: z.nativeEnum(AccountChangeTypeEnum),
  amount: z.coerce.number(),
  date: z.date(),
})
