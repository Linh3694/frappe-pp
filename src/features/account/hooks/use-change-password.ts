import { AuthContext, useAuthContext } from '@/lib/auth/auth-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { zxcvbn } from '@zxcvbn-ts/core'
import { FrappeError } from 'frappe-react-sdk'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router-dom'
import { z } from 'zod'

const validationSchema = z
  .object({
    old_password: z.string().min(1, { message: 'The password is required' }),
    new_password: z.string().min(1, { message: 'The password is required' }),
    re_password: z
      .string()
      .min(1, { message: 'The confirm password is required' }),
  })
  .refine((values) => values.new_password === values.re_password, {
    message: 'Passwords do not match',
    path: ['re_password'],
  })

const useChangePassword = () => {
  const totalLevel: number = 4
  const [error, setError] = useState<FrappeError | null>(null)
  const [level, setLevelPassword] = useState<number>(0)
  const { key } = useParams<{ key: string }>()
  const navigate = useNavigate()
  const { changePassword, updateCurrentUser } = useAuthContext()

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      old_password: '',
      new_password: '',
      re_password: '',
    },
  })

  const handleSubmit = (data: any) => {
    const testResult = zxcvbn(form.getValues('new_password'))
    //@ts-ignore
    const scoreSetting = window.frappe.boot.sysdefaults.minimum_password_score

    if (testResult.score < scoreSetting) {
      setError({
        message:
          'The password must include symbols, numbers and capital letters.',
        httpStatus: 400,
        httpStatusText: 'Bad request',
        exception: 'Your password too week',
      })
      return
    }
    return new Promise(async (resolve,reject) => {
      try {
        await changePassword(data.old_password, data.new_password)
        resolve(true)
      } catch (error: any) {
        console.log(error)
        setError(error)
        reject(error)
      }
    })
  }

  useEffect(() => {
    const testResult = zxcvbn(form.getValues('new_password'))
    if (form.getValues('new_password') && testResult.score == 0) {
      setLevelPassword(1)
    } else if (!form.getValues('new_password')) {
      setLevelPassword(0)
    } else {
      setLevelPassword(testResult.score)
    }
  }, [form.watch('new_password')])

  return {
    form,
    error,
    level,
    totalLevel,
    handleSubmit,
  }
}
export default useChangePassword
