import { SWRConfiguration, useFrappeGetCall } from 'frappe-react-sdk'
import React, { useState } from 'react'

type Props = {
  method: string
  params?: Record<string, any>
  swrKey?: string
  options?: SWRConfiguration
}

export default function useFetch<T>({
  method,
  params,
  swrKey,
  options,
}: Props) {
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState<boolean>(false)
  const { error } = useFrappeGetCall<{ message: T }>(method, params, swrKey, {
    onSuccess: (data) => {
      setData(data.message)
      setLoading(true)
    },
    onError: () => {
      setLoading(true)
    },
    ...options,
  })
  return { data, error, loading }
}
