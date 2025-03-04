import { createContext, useEffect, useState } from 'react'

export type User = {
  name: string
  login: string
  _id: string
  token: string
}

export const UserContext = createContext<{
  user: User | null
  setUser: (user: User) => void
}>({
  user: null,
  setUser: () => {},
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const userFromLocal = localStorage.getItem('user')
    if (!userFromLocal) return
    setUser(JSON.parse(userFromLocal || '{}'))
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
