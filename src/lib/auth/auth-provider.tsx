import { PPUser } from '@/types/ParentPortal/PPUser'
import { SISPerson } from '@/types/SIS/SISPerson'
import {
  useFrappeAuth,
  useFrappeGetCall,
  useFrappePostCall,
  useSWRConfig,
} from 'frappe-react-sdk'
import React, { createContext, useState } from 'react'

export enum USER_ROLE {
  GUARDIAN = 'GUARDIAN',
  TEACHER = 'TEACHER',
}

interface AuthContextProps {
  isLoading: boolean
  currentUser: string
  userInfo?: SISPerson | null
  login: (username: string, password: string) => Promise<void>
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
  login: () => Promise.resolve(),
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
  const {
    login,
    logout,
    currentUser,
  
    updateCurrentUser,
    isLoading: authLoading,
  } = useFrappeAuth()
  const [userInfo, setUserInfo] = useState<AuthContextProps['userInfo']>()
  const [userRole, setUserRole] = useState<AuthContextProps['userRole']>()
  const [prefixRoute, setPrefixRoute] = useState<string>('')

  const { call: resetPwd, loading: resetPwdLoading } = useFrappePostCall(
    'parent_portal.api.login.reset_password',
  )
  const { call: updatePwd, loading: updatePwdLoading } = useFrappePostCall(
    'frappe.core.doctype.user.user.update_password',
  )
  // console.log(currentUser);
  
  const { error: getUserInfoError, isLoading: getUserInfoLoading } =
    useFrappeGetCall<{ message: PPUser }>(
      'parent_portal.api.login.get_current_user_info',
      undefined,
      currentUser ? "get_user_info": null,
      {
        revalidateOnFocus: false,
        onSuccess: (data) => {
          const primaryRole = data.message.sis_role
          const userInfo = data.message.person

          console.log('Authenticated', {
            currentUser,
            primaryRole,
            userInfo,
          })

          setUserInfo(userInfo)
          if (primaryRole === 'Parent') {
            setUserRole(USER_ROLE.GUARDIAN)
            setPrefixRoute('')
          } else if (primaryRole === 'Teacher') {
            setUserRole(USER_ROLE.TEACHER)
            setPrefixRoute('teacher')
          } else {
            setUserRole(null)
          }
        },
        onError: () => {
          setUserRole(null)
        },
      },
    )

  const isLoading =
    authLoading || resetPwdLoading || updatePwdLoading || getUserInfoLoading

  const resetPassword = async (email: string, send_email: boolean) => {
    return resetPwd({ email, send_email })
  }

  const updatePassword = async (key: string, newPassword: string) => {
    return updatePwd({ key, new_password: newPassword })
  }

  const changePassword = async (oldPassword: string, newPassword: string) => {
    return updatePwd({ old_password: oldPassword, new_password: newPassword })
  }

  const handleLogout = async () => {
    localStorage.removeItem('ppLastChannel')
    return logout()
      .then(() => {
        //Clear cache on logout
        return mutate(() => true, undefined, false)
      })
      .then(() => {
        //Reload the page so that the boot info is fetched again
        // const URL = import.meta.env.VITE_BASE_NAME
        //   ? `${import.meta.env.VITE_BASE_NAME}`
        //   : ``
        // window.location.replace(`/auth/login`)
        window.location.reload()
      })
  }

  const handleLogin = async (username: string, password: string) => {
    return login({
      username,
      password,
    }).then(() => {
      // TODO: Set client user role

      //Reload the page so that the boot info is fetched again
      // const URL = import.meta.env.VITE_BASE_NAME
      //   ? `/${import.meta.env.VITE_BASE_NAME}`
      //   : ``
      // window.location.replace(`${URL}/`)
    })
  }

  return (
    <AuthContext.Provider
      value={{
        isLoading,
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
