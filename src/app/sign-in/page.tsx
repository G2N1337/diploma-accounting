'use client'

import { Button, Card, Center, Stack, TextInput, Title } from '@mantine/core'
import { useForm, SubmitHandler } from 'react-hook-form'
import React, { useContext } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignInSchema } from './validation'
import axios from 'axios'
import { User, UserContext } from '@/context/user-context'
import { useRouter } from 'next/navigation'

type LoginFormInput = {
  login: string
  password: string
}

export default function SignInPage() {
  const router = useRouter()
  const { setUser } = useContext(UserContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>({
    resolver: zodResolver(SignInSchema),

    defaultValues: {
      login: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    const res = await axios.post<User>(
      `http://${
        process.env.NEXT_PUBLIC_VERCEL_URL || process.env.NEXT_PUBLIC_API_URL
      }/api/account/sign-in`,
      { login: data.login, password: data.password }
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
          <Title mb={12}>Войти в аккаунт</Title>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack align='stretch'>
              <TextInput
                type='text'
                label='Логин'
                error={errors.login?.message}
                {...register('login')}
              />

              <TextInput
                type='password'
                error={errors.password?.message}
                label='Пароль'
                {...register('password')}
              />

              <Button variant='gradient' type='submit'>
                Войти
              </Button>
            </Stack>
          </form>
        </Card.Section>
      </Card>
    </Center>
  )
}
