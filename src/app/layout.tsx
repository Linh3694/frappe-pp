import { Permission } from '@/core/utils/permission'
import { createPage } from '@/core/utils/route-guard'
import { useEffect, type FC } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import ForbiddenState from '@features/states/forbbiden-state'
import { useAuthContext, USER_ROLE } from '@/lib/auth/auth-provider'
import ServerErrorState from '@features/states/server-error-state'
import NoPermissionState from '@features/states/no-permisson-state'
import { SpinnerColorfull } from '@templates/spinner-colorfull'
import { ModalProvider } from '@/lib/shadcn/modal-provider'

const PERMISSIONS: Permission[] = []
const DISPLAY_NAME = 'RootLayout'

export const Route: FC = () => {
  // const navigate = useNavigate()
  // const { currentUser, userRole, userInfo } = useAuthContext()
  // console.log('LAYOUT', currentUser, userRole, userInfo)

  // if (currentUser && userRole === null) {
  //   return <NoPermissionState />
  // }

  // if (!currentUser && userInfo === null) {
  //   navigate('/auth/login')
  // }

  // if (currentUser && userRole === USER_ROLE.GUARDIAN) {
  //   // return <Navigate to="/" />
  // }

  // if (currentUser && userRole === USER_ROLE.TEACHER) {
  //   // return <Navigate to="/teacher/news" />
  // }

  return (
    // <SpinnerColorfull>
    <ModalProvider>
      <Outlet />
    </ModalProvider>
    // </SpinnerColorfull>
  )
}

const Component = createPage(Route, PERMISSIONS, <ForbiddenState />)

Route.displayName = `${DISPLAY_NAME}Page`
Component.displayName = DISPLAY_NAME

export { Component }
