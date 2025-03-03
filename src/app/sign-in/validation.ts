import { z } from 'zod'

export const SignInSchema = z.object({
  login: z.string().min(4),
  password: z.string().min(6)
})
