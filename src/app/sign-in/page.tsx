'use client'

import { Button, Card, Center, Stack, TextInput, Title } from '@mantine/core'
import { useForm, SubmitHandler } from 'react-hook-form'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignInSchema } from './validation'
import axios from 'axios'

type LoginFormInput = {
  login: string
  password: string
}

export default function SignInPage() {
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
    console.log(data)
    const res = await axios.post(
      `http://${
        process.env.NEXT_PUBLIC_VERCEL_URL || process.env.NEXT_PUBLIC_API_URL
      }/api/account/sign-in`,
      { login: data.login, password: data.password }
    )
    console.log(res)
    return res
  }
  return (
    <Center h='100vh'>
      <Card radius='lg' p={36}>
        <Card.Section>
          <Title mb={12}>Войти в аккаунт</Title>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack w={300}>
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
                Войти!
              </Button>
            </Stack>
          </form>
        </Card.Section>
      </Card>
    </Center>
  )
}
