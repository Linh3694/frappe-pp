import { PPUser } from '@/types/ParentPortal/PPUser'
import { SISPerson } from '@/types/SIS/SISPerson'
import {
  useFrappePostCall,
  useSWRConfig,
} from 'frappe-react-sdk'
import React, { createContext, useState } from 'react'
import Cookies from 'js-cookie'



// Helper function để lấy user data từ cookies sử dụng js-cookie (better approach)
const getUserDataFromCookies = () => {
  const userId = Cookies.get('user_id') || ''
  const fullName = Cookies.get('full_name') || ''
  const userImage = Cookies.get('user_image') || ''
  const systemUser = Cookies.get('system_user') || ''
  const sid = Cookies.get('sid') || ''
  
  console.log('🍪 User data from cookies:', {
    userId, fullName, userImage, systemUser, sid, hasImage: !!userImage
  })
  
  if (!userId || userId === 'Guest') {
    console.log('❌ No valid user in cookies')
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
    console.log('🔍 Fetching user profile from API...')
    const response = await fetch('https://admin.sis.wellspring.edu.vn/api/method/parent_portal.api.user_availability.get_person_by_current_user', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      credentials: 'include',
    })
    
    if (!response.ok) {
      console.warn('⚠️ Failed to fetch user profile:', response.status)
      return null
    }
    
    const result = await response.json()
    console.log('✅ User profile API response:', result)
    
    if (result.message) {
      return result.message as SISPerson
    }
    
    return null
  } catch (error) {
    console.error('❌ Error fetching user profile:', error)
    return null
  }
}

// Helper function để determine user role từ username pattern hoặc default
const determineUserRole = (username: string): { role: USER_ROLE, prefix: string } => {
  // Logic để xác định role dựa trên pattern email hoặc default
  // Tạm thời default là TEACHER, có thể customize sau
  
  // Nếu cần có thể thêm logic:
  // if (username.includes('parent') || username.includes('guardian')) {
  //   return { role: USER_ROLE.GUARDIAN, prefix: '' }
  // }
  
  return { role: USER_ROLE.TEACHER, prefix: 'teacher' }
}

// Helper function để debug cookies và session
const debugSessionInfo = () => {
  console.log('🔍 Session Debug Info:')
  console.log('📋 All Cookies:', document.cookie)
  
  // Parse cookies
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [name, value] = cookie.trim().split('=')
    acc[name] = decodeURIComponent(value || '')
    return acc
  }, {} as Record<string, string>)
  
  console.log('🍪 Parsed Cookies:', cookies)
  console.log('🔑 SID Cookie:', cookies['sid'])
  console.log('🛡️ CSRF Token:', (window as any).csrf_token)
  console.log('🌐 Frappe Object:', (window as any).frappe)
  
  // Check local storage
  console.log('💾 LocalStorage Keys:', Object.keys(localStorage))
  console.log('💾 LocalStorage frappe keys:', Object.keys(localStorage).filter(k => k.includes('frappe')))
  
  return cookies
}

// Helper function để lấy CSRF token một cách an toàn
const getCSRFToken = (): string => {
  try {
    // Thử lấy từ window.csrf_token trước
    if ((window as any).csrf_token) {
      return (window as any).csrf_token
    }
    
    // Thử lấy từ frappe object
    if ((window as any).frappe?.csrf_token) {
      return (window as any).frappe.csrf_token
    }
    
    // Thử lấy từ cookie nếu có
    const cookies = document.cookie.split(';')
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=')
      if (name === 'csrf_token') {
        return decodeURIComponent(value)
      }
    }
    
    console.warn('⚠️ CSRF token not found, continuing without it')
    return ''
  } catch (error) {
    console.error('❌ Error getting CSRF token:', error)
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
  
  // State management
  const [isLoading, setIsLoading] = useState(true) // Start with loading true
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
    
    console.log('🔄 Restoring from localStorage:', {
      storedUser,
      storedUserInfo: !!storedUserInfo,
      storedUserRole,
      storedPrefixRoute
    })
    
    if (storedUser) {
      console.log('✅ Restoring user session:', storedUser)
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
      
      console.log('✅ Session restored successfully')
    } else {
      console.log('ℹ️ No stored session found')
    }
    
    // Set loading false sau khi restore xong
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
    console.log('🔄 Updating current user info...')
    
    // Force refresh by re-reading cookies
    if (currentUser) {
      const cookieData = getUserDataFromCookies()
      if (cookieData && cookieData.userInfo) {
        console.log('🍪 Updated user info from cookies:', cookieData.userInfo)
        
        // Update state with fresh cookie data
        setUserInfo(cookieData.userInfo as any)
        localStorage.setItem('ppUserInfo', JSON.stringify(cookieData.userInfo))
        
        // Also check if we need to update other info
        if (cookieData.systemUser && !userRole) {
          // Try to determine role if not set
          const { role, prefix } = determineUserRole(currentUser)
          setUserRole(role)
          setPrefixRoute(prefix)
          localStorage.setItem('ppUserRole', role)
          localStorage.setItem('ppPrefixRoute', prefix)
          console.log('🎯 Updated role from cookie data:', { role, prefix })
        }
        
        console.log('✅ User info updated successfully')
      } else {
        console.log('⚠️ No valid cookie data found for update')
      }
    } else {
      console.log('⚠️ No current user to update')
    }
  }

  const handleLogin = async (username: string, password: string) => {
    console.log('🚀 Starting simplified login flow:', { username })
    setIsLoading(true)
    
    try {
      // Step 1: Call login API through proxy to production backend
      const response = await fetch('https://admin.sis.wellspring.edu.vn/api/method/login', {
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
      console.log('✅ Login API response:', result)
      
      if (result.message === 'Logged In') {
        console.log('✅ Login successful! Processing user data...')
        
        // Step 2: Wait một chút để cookies được set
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Step 3: Lấy user data từ cookies
        const cookieData = getUserDataFromCookies()
        console.log('🍪 Cookie data after login:', cookieData)
        
        // Step 4: Try to fetch full user profile
        let fullProfile: SISPerson | null = null
        try {
          fullProfile = await fetchUserProfile()
          console.log('👤 User profile from API:', fullProfile)
        } catch (profileError) {
          console.warn('⚠️ Could not fetch full profile, using cookie data:', profileError)
        }
        
        // Step 5: Combine data sources
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
        
        console.log('🎯 Final user info:', userInfo)
        
        // Step 6: Determine role from user profile or email pattern
        let role = USER_ROLE.GUARDIAN  // Default to GUARDIAN instead of TEACHER
        let prefix = ''               // Default to empty for GUARDIAN
        
        // Method 1: Check if we have full profile data with roles
        if (fullProfile && (fullProfile as any).roles) {
          const userRoles = Array.isArray((fullProfile as any).roles) ? (fullProfile as any).roles : [];
          const hasTeacherRole = userRoles.some((r: any) => r.role === 'Teacher' || r.role === 'Faculty');
          const hasGuardianRole = userRoles.some((r: any) => r.role === 'Guardian' || r.role === 'Parent' || r.role === 'PP User');
          
          if (hasTeacherRole) {
            role = USER_ROLE.TEACHER
            prefix = 'teacher'
          } else if (hasGuardianRole) {
            role = USER_ROLE.GUARDIAN
            prefix = ''
          }
          console.log('🎯 Role determined from profile roles:', { userRoles, role, prefix })
        }
        // Method 2: Fallback to email pattern analysis
        else {
          // Analyze email pattern for role hints
          const email = username.toLowerCase()
          
          // Teacher patterns: usually have specific domains or patterns
          if (email.includes('teacher') || email.includes('faculty') || 
              email.includes('staff') || email.includes('edu.vn')) {
            // But check if it's actually a guardian email
            if (email.includes('parent') || email.includes('guardian')) {
              role = USER_ROLE.GUARDIAN
              prefix = ''
            } else {
              // For now, default most edu.vn emails to GUARDIAN since that's what we're seeing
              role = USER_ROLE.GUARDIAN
              prefix = ''
            }
          } else {
            role = USER_ROLE.GUARDIAN
            prefix = ''
          }
          console.log('🎯 Role determined from email pattern:', { email, role, prefix })
        }
        
        // Method 3: Override with home_page if it's clearly defined
        if (result.home_page) {
          if (result.home_page.includes('/parent_portal') || result.home_page === '/') {
            role = USER_ROLE.GUARDIAN
            prefix = ''
          }
          console.log('🎯 Final role after home_page check:', { role, prefix, home_page: result.home_page })
        }
        
        // Step 7: Set state
        setCurrentUser(username)
        setUserInfo(userInfo as any)
        setUserRole(role)
        setPrefixRoute(prefix)
        
        // Step 8: Save to localStorage
        localStorage.setItem('ppCurrentUser', username)
        localStorage.setItem('ppUserInfo', JSON.stringify(userInfo))
        localStorage.setItem('ppUserRole', role)
        localStorage.setItem('ppPrefixRoute', prefix)
        
        console.log('🎉 Login completed successfully!')
        setIsLoading(false)
        
        // Step 9: Return navigation path
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
      console.error('💥 Login failed:', error)
      setIsLoading(false)
      throw error
    }
  }

  const handleLogout = async () => {
    console.log('🚪 Starting logout...')
    setIsLoading(true)
    
    try {
      // Clear localStorage trước
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
      
      console.log('✅ Logout completed')
      
      // Reload page sau logout
      setTimeout(() => {
        window.location.reload()
      }, 100)
      
    } catch (error) {
      console.error('💥 Logout error:', error)
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
