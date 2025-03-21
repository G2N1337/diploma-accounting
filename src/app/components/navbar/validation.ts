import { z } from 'zod'

export type AccountingType = {
  type: string
  wallet: string;
  amount: number
  category: string
  comment?: string
  date: Date
}

export const AccountingSchema = z.object({
  type: z.string().min(1),
  amount: z.number().min(1),
  comment: z.string().optional(),
  category: z.string().min(1),
  date: z.date(),
  wallet: z.string().min(1)
})
