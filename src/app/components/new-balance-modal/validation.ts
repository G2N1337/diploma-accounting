import { z } from 'zod'

export const balanceObjectSchema = z.object({
  balance: z.number().min(1)
})
