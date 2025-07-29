import { useFrappeGetCall } from 'frappe-react-sdk'
import { FRAPPE_APIS } from '../api.config'

export interface CurrentUserInfo {
  user: string
  user_info: {
    name: string
    full_name: string
    email: string
    first_name: string
    user_image: string
    avatar: string
  }
  role: string
  prefix: string
  session_valid: boolean
  pp_user_exists?: boolean
  is_guest?: boolean
  error?: string
}

export const useGetCurrentUserInfo = (skip?: boolean) => {
  const { data, error, isLoading, isValidating, mutate } = useFrappeGetCall<{
    message: CurrentUserInfo
  }>(
    FRAPPE_APIS.GET_CURRENT_USER_INFO.METHOD_STRING,
    {},
    !skip ? FRAPPE_APIS.GET_CURRENT_USER_INFO.SWR_KEY : null,
  )

  const userInfo = data?.message

  return { 
    userInfo, 
    error, 
    isLoading, 
    isValidating, 
    mutate 
  }
}

// Helper function để gọi API trực tiếp không qua SWR
export const getCurrentUserInfo = async (): Promise<CurrentUserInfo | null> => {
  try {
    console.log('🔍 Fetching current user info from API...')
    const response = await fetch(`/api/method/${FRAPPE_APIS.GET_CURRENT_USER_INFO.METHOD_STRING}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      credentials: 'include',
    })
    
    if (!response.ok) {
      console.warn('⚠️ Failed to fetch current user info:', response.status)
      return null
    }
    
    const result = await response.json()
    console.log('✅ Current user info API response:', result)
    
    if (result.message) {
      return result.message as CurrentUserInfo
    }
    
    return null
  } catch (error) {
    console.error('❌ Error fetching current user info:', error)
    return null
  }
} 