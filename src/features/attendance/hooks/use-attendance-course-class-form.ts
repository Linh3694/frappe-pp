import { AuthContext } from '@/lib/auth/auth-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { FrappeError } from 'frappe-react-sdk'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const validationSchema = z.object({
  class: z
  .string()
  .min(1, { message: 'The course class is required' }),
  period: z
    .string()
    .min(1, { message: 'The period is required' })
})

const useAttendanceCourseClassForm = (onSuccess?: VoidFunction) => {
  const [error, setError] = useState<FrappeError | null>(null)

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      period: '',
    },
  })

  return {
    form,
    error,
  }
}
export default useAttendanceCourseClassForm
