import { useFrappeGetCall } from 'frappe-react-sdk'
import { FRAPPE_APIS } from '../api.config'

export interface UserInfoAfterLogin {
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
  pp_user_exists: boolean
  error?: string
}

export const useGetUserInfoAfterLogin = (skip?: boolean) => {
  const { data, error, isLoading, isValidating, mutate } = useFrappeGetCall<{
    message: UserInfoAfterLogin
  }>(
    FRAPPE_APIS.GET_USER_INFO_AFTER_LOGIN.METHOD_STRING,
    {},
    !skip ? FRAPPE_APIS.GET_USER_INFO_AFTER_LOGIN.SWR_KEY : null,
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
export const getUserInfoAfterLogin = async (): Promise<UserInfoAfterLogin | null> => {
  try {
    console.log('🔍 Fetching user info after login from API...')
    const response = await fetch(`/api/method/${FRAPPE_APIS.GET_USER_INFO_AFTER_LOGIN.METHOD_STRING}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      credentials: 'include',
    })
    
    if (!response.ok) {
      console.warn('⚠️ Failed to fetch user info after login:', response.status)
      return null
    }
    
    const result = await response.json()
    console.log('✅ User info after login API response:', result)
    
    if (result.message) {
      return result.message as UserInfoAfterLogin
    }
    
    return null
  } catch (error) {
    console.error('❌ Error fetching user info after login:', error)
    return null
  }
} 