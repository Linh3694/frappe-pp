import { useFrappeGetCall } from 'frappe-react-sdk'
import { FRAPPE_APIS } from '../api.config'
import { SISPerson } from '@/types/SIS/SISPerson'

export const useGetCurrentUserProfile = (skip?: boolean) => {
  const { data, error, isLoading, isValidating, mutate } = useFrappeGetCall<{
    message: SISPerson
  }>(
    FRAPPE_APIS.GET_CURRENT_USER_PROFILE.METHOD_STRING,
    {},
    !skip ? FRAPPE_APIS.GET_CURRENT_USER_PROFILE.SWR_KEY : null,
  )

  const userProfile = data?.message

  return { 
    userProfile, 
    error, 
    isLoading, 
    isValidating, 
    mutate 
  }
} 