import { useLocales } from '@/core/hooks'
import { AuthContext } from '@/lib/auth/auth-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { FrappeError } from 'frappe-react-sdk'
import { useCallback, useContext, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

const validationSchema = z.object({
  email: z.string(),
  password: z.string(),
})

export const useSignIn = () => {
  const { t, currentLanguage } = useLocales()
  const [error, setError] = useState<FrappeError | null>(null)
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const validationSchema = useMemo(
    () =>
      z.object({
        email: z
          .string()
          .trim()
          .min(1, { message: t('components.inputs.email.err_required') })
          .email({ message: t('components.inputs.email.err_invalid') }),
        password: z
          .string() 
          .trim()
          .min(1, { message: t('components.inputs.password.err_required') }),
      }),
    [currentLanguage],
  )

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmit = async (data: any) => {
    console.log('🔐 Starting login process...', data.email);
    try {
      const result = await login(data.email, data.password)
      console.log('✅ Login hook success:', result);
      
      // Handle navigation if login successful
      if (result.shouldNavigateTo) {
        console.log('🚀 Navigating to:', result.shouldNavigateTo)
        navigate(result.shouldNavigateTo, { replace: true })
      } else {
        console.log('⚠️ No navigation path returned from login')
      }
      
      return Promise.resolve(result)
    } catch (error: any) {
      console.error('❌ Login hook error:', error);
      setError(error)
      return Promise.reject(error)
    }
  }

  return {
    form,
    error,
    handleSubmit,
  }
}
