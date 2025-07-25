import { useRegistration } from '@/api/account/use-registration'
import { FRAPPE_APIS } from '@/api/api.config'
import { REGEX } from '@/core/constant/regex'
import { useLocales } from '@/core/hooks'
import { AuthContext } from '@/lib/auth/auth-provider'
import { replaceUndefinedWithNull } from '@/lib/utils/common'
import { zodResolver } from '@hookform/resolvers/zod'
import { FrappeError, useFrappePostCall } from 'frappe-react-sdk'
import { useCallback, useContext, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export type RegisterPayload = {
  full_name: string
  common_name: string
  date_of_birth: string
  nationality: string
  email: string
  phone_number: string
  address: string
  province: string
  district: string
  ward: string
  company: string
  job_title: string
  relationship_with_student: string
  family: string
  person: string
}

export const useSignUp = () => {
  const { t, currentLanguage } = useLocales()
  const [error, setError] = useState<FrappeError | null>(null)
  const { login } = useContext(AuthContext)
  const { call: submitCreate } = useFrappePostCall<{
    message: any
  }>(FRAPPE_APIS.REGISTRATION.METHOD_STRING)

  const validationSchema = useMemo(
    () =>
      z
        .object({
          full_name: z
            .string()
            .trim()
            .min(1, { message: t('components.inputs.full_name.err_required') }),
          first_name: z
            .string()
            .trim()
            .min(1, { message: t('components.inputs.name.err_required') }),
          date_of_birth: z.coerce.date().optional(),
          nationality: z.string().optional(),
          email: z
            .string()
            .trim()
            .min(1, { message: t('components.inputs.email.err_required') })
            .email({ message: t('components.inputs.email.err_invalid') })
            .regex(REGEX.email_wellspring, {
              message: t('components.inputs.email.err_wellspring_email'),
            })
            .refine(async (email) => {
              // Perform API request to check if email exists
              const reg = new RegExp(REGEX.email_wellspring)
              if (reg.test(email)) {
                try {
                  const res = await fetch(
                    `/api/method/${FRAPPE_APIS.VALIDATE_EMAIL.METHOD_STRING}?in_email=${email}`,
                    {
                      method: 'GET',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                    },
                  )
                  if (!res.ok) {
                    // Throw an error if the response status is not ok
                    throw new Error(`HTTP error! status: ${res.status}`)
                  }
                  return true
                } catch (error) {
                  return false
                }
              }
            }, t('components.inputs.email.err_email_exists')),
          phone_number: z
            .string()
            .trim()
            .min(1, { message: t('components.inputs.phone.err_required') })
            .regex(REGEX.phone, {
              message: t('components.inputs.phone.err_invalid'),
            }),
          address: z.string().trim().optional(),
          province: z.string().optional(),
          district: z.string().optional(),
          ward: z.string().optional(),
          company: z.string().trim().optional(),
          job_title: z.string().trim().optional(),
        })
        .refine(
          ({ full_name, first_name }) => {
            return full_name.includes(first_name)
          },
          {
            path: ['first_name'],
            message: t('components.inputs.name.err_included'),
          },
        ),
    [currentLanguage],
  )

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    mode: 'onTouched',
    defaultValues: {
      full_name: '',
      first_name: '',
      date_of_birth: undefined,
      nationality: undefined,
      email: '',
      phone_number: '',
      address: undefined,
      province: '{"name":"Thành phố Hồ Chí Minh","code":79}',
      district: undefined,
      ward: undefined,
      company: '',
      job_title: '',
    },
  })

  const handleSubmit = async (payload: RegisterPayload) => {
    // console.log(payload,replaceUndefinedWithNull(payload));

    try {
      const result = await submitCreate({
        doc: replaceUndefinedWithNull(payload),
      })
      return Promise.resolve(result.message)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return {
    form,
    error,
    handleSubmit,
  }
}
