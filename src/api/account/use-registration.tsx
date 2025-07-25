import { CountryType } from '@/types/Extends/Country'
import { useFrappePostCall } from 'frappe-react-sdk'
import { useEffect, useState } from 'react'
import { FRAPPE_APIS } from '../api.config'
import { replaceUndefinedWithNull } from '@/lib/utils/common'

export type RegisterPayload = {
 full_name: string,
    common_name: string,
    date_of_birth: string,
    nationality : string,
    email : string,
    phone_number : string,
    address : string,
    province : string,
    district : string,
    ward : string,
    company : string,
    job_title : string,
    relationship_with_student: string,
    family: string,
    person: string
}

export const useRegistration = () => {
  const { call: submitCreate } = useFrappePostCall<{
    message: any
  }>(FRAPPE_APIS.REGISTRATION.METHOD_STRING)

  const register = async (payload: RegisterPayload) => {
    try {
      const result = await submitCreate({
        doc: replaceUndefinedWithNull(payload),
      })
      return Promise.resolve(result.message)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return { register }
}
