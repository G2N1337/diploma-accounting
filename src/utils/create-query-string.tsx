'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { useCallback } from 'react'

export const useQueryString = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const updateQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())

      if (value === '') {
        params.delete(name)
      } else {
        params.set(name, value)
      }

      const newUrl = `${window.location.pathname}?${params.toString()}`
      router.push(newUrl)
    },
    [searchParams, router]
  )

  return updateQueryString
}
