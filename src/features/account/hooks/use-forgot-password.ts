import { AuthContext } from '@/lib/auth/auth-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { FrappeError } from 'frappe-react-sdk'
import { useCallback, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const validationSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'The email is required' })
    .email({ message: 'Must be a valid email' }),
})

const useForgotPassword = (onSuccess?: VoidFunction) => {
  const [error, setError] = useState<FrappeError | null>(null)
  const { resetPassword } = useContext(AuthContext)

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      email: '',
    },
  })

  const handleSubmit = (data: any) => {
    return new Promise(async (resolve) => {
      try {
        const res = await resetPassword(data.email, false)
        console.log(res);
        onSuccess?.()
      } catch (error: any) {
        switch (error.httpStatusText) {
          case 'NOT FOUND':
            {
              error.message = 'Cannot find your email in our system'
            }
            break
        }
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
export default useForgotPassword
