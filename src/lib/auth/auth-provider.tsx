import { PPUser } from '@/types/ParentPortal/PPUser'
import { SISPerson } from '@/types/SIS/SISPerson'
import {
  useFrappePostCall,
  useSWRConfig,
} from 'frappe-react-sdk'
import React, { createContext, useState } from 'react'
import Cookies from 'js-cookie'
import { getLoginUrl, getUserProfileUrl } from '@/lib/utils/api-url'
import { getCurrentUserInfo } from '@/api/account/use-get-user-info-after-login'

// Helper function để lấy user data từ cookies
const getUserDataFromCookies = () => {
  const userId = Cookies.get('user_id') || ''
  const fullName = Cookies.get('full_name') || ''
  const userImage = Cookies.get('user_image') || ''
  const systemUser = Cookies.get('system_user') || ''
  const sid = Cookies.get('sid') || ''
  
  if (!userId || userId === 'Guest') {
    return null
  }
  
  return {
    userInfo: {
      name: userId,
      full_name: fullName || userId,
      email: userId,
      first_name: fullName?.split(' ')[0] || 'User',
      user_image: userImage,
      avatar: userImage
    },
    systemUser,
    sid
  }
}

// Helper function để call API lấy full user profile
const fetchUserProfile = async (): Promise<SISPerson | null> => {
  try {
    const response = await fetch(getUserProfileUrl(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      credentials: 'include',
    })
    
    if (!response.ok) {
      return null
    }
    
    const result = await response.json()    
    if (result.message) {
      return result.message as SISPerson
    }
    
    return null
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return null
  }
}

// Helper function để lấy CSRF token
const getCSRFToken = (): string => {
  try {
    if ((window as any).csrf_token) {
      return (window as any).csrf_token
    }
    
    if ((window as any).frappe?.csrf_token) {
      return (window as any).frappe.csrf_token
    }
    
    const cookies = document.cookie.split(';')
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=')
      if (name === 'csrf_token') {
        return decodeURIComponent(value)
      }
    }
    
    return ''
  } catch (error) {
    console.error('Error getting CSRF token:', error)
    return ''
  }
}

export enum USER_ROLE {
  GUARDIAN = 'GUARDIAN',
  TEACHER = 'TEACHER',
}

interface AuthContextProps {
  isLoading: boolean
  currentUser: string
  userInfo?: SISPerson | null
  login: (username: string, password: string) => Promise<{ shouldNavigateTo?: string }>
  logout: () => Promise<void>
  updateCurrentUser: VoidFunction
  resetPassword: (email: string, send_email: boolean) => void
  updatePassword: (key: string, newPassword: string) => void
  changePassword: (oldPassword: string, newPassword: string) => void
  userRole?: USER_ROLE | null
  prefixRoute?: string
}

export const AuthContext = createContext<AuthContextProps>({
  currentUser: '',
  isLoading: false,
  login: () => Promise.resolve({}),
  logout: () => Promise.resolve(),
  updateCurrentUser: () => {},
  resetPassword: () => {},
  updatePassword: () => {},
  changePassword: () => {},
  prefixRoute: '',
})

export const useAuthContext = () => React.useContext(AuthContext)

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const { mutate } = useSWRConfig()
  
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<string>('')
  const [userInfo, setUserInfo] = useState<AuthContextProps['userInfo']>()
  const [userRole, setUserRole] = useState<AuthContextProps['userRole']>()
  const [prefixRoute, setPrefixRoute] = useState<string>('')
  
  // Initialize từ localStorage khi component mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('ppCurrentUser')
    const storedUserInfo = localStorage.getItem('ppUserInfo')
    const storedUserRole = localStorage.getItem('ppUserRole')
    const storedPrefixRoute = localStorage.getItem('ppPrefixRoute')
    
    if (storedUser) {
      setCurrentUser(storedUser)
      
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo))
      }
      if (storedUserRole) {
        setUserRole(storedUserRole as USER_ROLE)
      }
      if (storedPrefixRoute) {
        setPrefixRoute(storedPrefixRoute)
      }
    }
    
    setIsLoading(false)
  }, [])

  const { call: resetPwd, loading: resetPwdLoading } = useFrappePostCall(
    'parent_portal.api.login.reset_password',
  )
  const { call: updatePwd, loading: updatePwdLoading } = useFrappePostCall(
    'frappe.core.doctype.user.user.update_password',
  )

  const resetPassword = async (email: string, send_email: boolean) => {
    return resetPwd({ email, send_email })
  }

  const updatePassword = async (key: string, newPassword: string) => {
    return updatePwd({ key, new_password: newPassword })
  }

  const changePassword = async (oldPassword: string, newPassword: string) => {
    return updatePwd({ old_password: oldPassword, new_password: newPassword })
  }

  const updateCurrentUser = () => {
    if (currentUser) {
      const cookieData = getUserDataFromCookies()
      if (cookieData && cookieData.userInfo) {
        setUserInfo(cookieData.userInfo as any)
        localStorage.setItem('ppUserInfo', JSON.stringify(cookieData.userInfo))
        
        if (cookieData.systemUser && !userRole) {
          // Default to TEACHER role
          setUserRole(USER_ROLE.TEACHER)
          setPrefixRoute('teacher')
          localStorage.setItem('ppUserRole', USER_ROLE.TEACHER)
          localStorage.setItem('ppPrefixRoute', 'teacher')
        }
      }
    }
  }

  const handleLogin = async (username: string, password: string) => {
    setIsLoading(true)
    
    try {
      const loginUrl = getLoginUrl()
      
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          usr: username,
          pwd: password,
        }),
      })
      
      if (!response.ok) {
        throw new Error(`Login failed: ${response.status} ${response.statusText}`)
      }
      
      const result = await response.json()
      
      if (result.message === 'Logged In') {
        // Wait for cookies to be set
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Get user data from cookies
        const cookieData = getUserDataFromCookies()
        
        // Try to fetch full user profile
        let fullProfile: SISPerson | null = null
        try {
          fullProfile = await fetchUserProfile()
        } catch (profileError) {
          console.warn('Could not fetch full profile, using cookie data:', profileError)
        }
        
        // Combine data sources
        let userInfo
        if (fullProfile) {
          userInfo = {
            ...fullProfile,
            name: fullProfile.name || username,
            full_name: fullProfile.full_name || username,
            email: fullProfile.email || username,
            first_name: fullProfile.first_name || fullProfile.full_name?.split(' ')[0] || 'User',
            user_image: fullProfile.avatar || '',
            avatar: fullProfile.avatar || '',
          }
        } else if (cookieData?.userInfo) {
          userInfo = cookieData.userInfo
        } else {
          userInfo = {
            name: username,
            full_name: result.full_name || username,
            email: username,
            first_name: result.full_name?.split(' ')[0] || 'User',
            user_image: '',
            avatar: ''
          }
        }
        
        // Determine role from backend API
        let role = USER_ROLE.GUARDIAN
        let prefix = ''
        
        try {
          const backendUserInfo = await getCurrentUserInfo()
          
          if (backendUserInfo && !backendUserInfo.is_guest) {
            if (backendUserInfo.role === 'Teacher') {
              role = USER_ROLE.TEACHER
              prefix = 'teacher'
            } else if (backendUserInfo.role === 'Parent') {
              role = USER_ROLE.GUARDIAN
              prefix = ''
            }
            
            // Update userInfo with backend data if available
            if (backendUserInfo.user_info) {
              userInfo = {
                ...userInfo,
                ...backendUserInfo.user_info
              }
            }
          } else {
            // Fallback: Analyze email pattern for role hints
            const email = username.toLowerCase()
            
            if (email.includes('teacher') || email.includes('faculty') || 
                email.includes('staff') || email.includes('instructor') ||
                email.includes('edu.vn')) {
              role = USER_ROLE.TEACHER
              prefix = 'teacher'
            } else if (email.includes('parent') || email.includes('guardian')) {
              role = USER_ROLE.GUARDIAN
              prefix = ''
            }
          }
        } catch (apiError) {
          console.error('Failed to get role from backend API:', apiError)
          
          // Final fallback: Check home_page from login response
          if (result.home_page) {
            if (result.home_page.includes('/teacher')) {
              role = USER_ROLE.TEACHER
              prefix = 'teacher'
            } else {
              role = USER_ROLE.GUARDIAN
              prefix = ''
            }
          }
        }
        
        // Set state
        setCurrentUser(username)
        setUserInfo(userInfo as any)
        setUserRole(role)
        setPrefixRoute(prefix)
        
        // Save to localStorage
        localStorage.setItem('ppCurrentUser', username)
        localStorage.setItem('ppUserInfo', JSON.stringify(userInfo))
        localStorage.setItem('ppUserRole', role)
        localStorage.setItem('ppPrefixRoute', prefix)
        
        setIsLoading(false)
        
        // Return navigation path
        let shouldNavigateTo: string | undefined
        if (role === USER_ROLE.TEACHER) {
          shouldNavigateTo = '/teacher'
        } else if (role === USER_ROLE.GUARDIAN) {
          shouldNavigateTo = '/dashboard'
        }
        
        return { shouldNavigateTo }
        
      } else {
        throw new Error('Login failed: Invalid response')
      }
      
    } catch (error) {
      console.error('Login failed:', error)
      setIsLoading(false)
      throw error
    }
  }

  const handleLogout = async () => {
    setIsLoading(true)
    
    try {
      // Clear localStorage
      localStorage.removeItem('ppCurrentUser')
      localStorage.removeItem('ppUserInfo')
      localStorage.removeItem('ppUserRole')
      localStorage.removeItem('ppPrefixRoute')
      localStorage.removeItem('ppLastChannel')
      
      // Clear local state
      setCurrentUser('')
      setUserInfo(undefined)
      setUserRole(undefined)
      setPrefixRoute('')
      
      // Call logout API
      const csrfToken = getCSRFToken()
      await fetch('/api/method/logout', {
        method: 'POST',
        headers: {
          'X-Frappe-CSRF-Token': csrfToken,
        },
        credentials: 'include',
      })
      
      // Clear cache
      await mutate(() => true, undefined, false)
      
      // Reload page after logout
      setTimeout(() => {
        window.location.reload()
      }, 100)
      
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isLoading: isLoading || resetPwdLoading || updatePwdLoading,
        updateCurrentUser,
        login: handleLogin,
        logout: handleLogout,
        currentUser: currentUser ?? '',
        resetPassword,
        updatePassword,
        changePassword,
        userRole,
        prefixRoute,
        userInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
