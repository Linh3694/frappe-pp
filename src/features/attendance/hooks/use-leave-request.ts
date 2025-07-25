import { AuthContext } from '@/lib/auth/auth-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { FrappeError } from 'frappe-react-sdk'
import { useCallback, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const validationSchema = z.object({
  sessionFromDate: z.string(),
  fromDate: z.date(),
  sessionToDate: z.string(),
  toDate: z.date(),
  reason: z.string(),
})

const useLeaveRequest = (onSuccess?: VoidFunction) => {
  const [error, setError] = useState<FrappeError | null>(null)

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      sessionFromDate: undefined,
      fromDate: undefined,
      sessionToDate: undefined,
      toDate: undefined,
      reason: undefined,
    },
  })

  const handleSubmit = (data: any) => {
    return new Promise(async (resolve) => {
      try {
       
        onSuccess?.()
      } catch (error: any) {
        setError(error)
      }
      resolve(true)
    })
  }

  return {
    form,
    error,
    handleSubmit,
  }
}
export default useLeaveRequest
