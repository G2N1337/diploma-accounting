'use client'

import { Button, Card, Center, Stack, TextInput, Title } from '@mantine/core'
import { useForm, SubmitHandler } from 'react-hook-form'
import React, { useContext } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { SignUpSchema } from './validation'
import { User, UserContext } from '@/context/user-context'
import { useRouter } from 'next/navigation'

type LoginFormInput = {
  login: string
  name: string
  password: string
  confirmPassword: string
}

export default function SignUpPage() {
  const { setUser } = useContext(UserContext)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>({
    resolver: zodResolver(SignUpSchema),

    defaultValues: {
      login: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    const res = await axios.post<User>(
      `http://${
        process.env.NEXT_PUBLIC_VERCEL_URL || process.env.NEXT_PUBLIC_API_URL
      }/api/account/sign-up`,
      { login: data.login, password: data.password, name: data.name }
    )

    setUser(res.data)

    localStorage.setItem('user', JSON.stringify(res.data))
    localStorage.setItem('token', res.data.token)

    router.push('/dashboard')

    return res
  }

  return (
    <Center h='100vh'>
      <Card radius='lg' p={36}>
        <Card.Section>
          <Title mb={12}>Зарегистрироваться</Title>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack align='stretch'>
              <TextInput
                type='text'
                label='Логин'
                error={errors.login?.message}
                {...register('login')}
              />

              <TextInput
                type='text'
                label='Имя'
                error={errors.name?.message}
                {...register('name')}
              />

              <TextInput
                type='password'
                error={errors.password?.message}
                label='Пароль'
                {...register('password')}
              />

              <TextInput
                type='password'
                error={errors.confirmPassword?.message}
                label='Подтвердить пароль'
                {...register('confirmPassword')}
              />

              <Button variant='gradient' type='submit'>
                Создать аккаунт
              </Button>
            </Stack>
          </form>
        </Card.Section>
      </Card>
    </Center>
  )
}
