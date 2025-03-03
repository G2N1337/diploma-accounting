import { z } from 'zod'

export const SignUpSchema = z.object({
  login: z.string().min(4),
  name: z.string().min(2),
  password: z.string().min(6),
  confirmPassword: z.string().min(6)
})
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли должны совпадать',
    path: ['confirmPassword'],
  });
