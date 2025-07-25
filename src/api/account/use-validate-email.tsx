import { CountryType } from '@/types/Extends/Country'
import { SISPerson } from '@/types/SIS/SISPerson'
import { useEffect, useState } from 'react'
import { FRAPPE_APIS } from '../api.config'
import { useFrappeGetCall } from 'frappe-react-sdk'

export const useValidateEmail = (email?: string, skip?: boolean) => {
  const { data, error, isLoading, isValidating, mutate } = useFrappeGetCall<{
    message: SISPerson | boolean
  }>(
    FRAPPE_APIS.VALIDATE_EMAIL.METHOD_STRING,
    {
      in_email: email,
    },
    !skip ? `${FRAPPE_APIS.VALIDATE_EMAIL.SWR_KEY}_${email}` : null,
  )

  useEffect(() => {
    if (!skip) {
      // console.log('email mutate:', email)
      mutate()
    }
  }, [skip, email])

  const person = typeof data?.message !== 'boolean' ? data?.message : undefined

  const result = data?.message === true

  return { person, result, error, isValidating }
}
