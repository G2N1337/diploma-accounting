import { UserContext } from '@/context/user-context'
import { Avatar, Header } from '@mantine/core'
import { useContext } from 'react'

export const HeaderComponent = () => {
  const { user } = useContext(UserContext)

  return (
    <Header height={60}>
      <Avatar radius='xl'>{user?.name}</Avatar>
    </Header>
  )
}
