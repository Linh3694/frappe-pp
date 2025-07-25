import ForbiddenState from '@features/states/forbbiden-state'
import { Permission } from '@/core/utils/permission'
import { createPage } from '@/core/utils/route-guard'
import type { FC } from 'react'

import { Navigate, Outlet } from 'react-router-dom'
import AuthLayout from '@templates/auth.layout'
import { USER_ROLE, useAuthContext } from '@/lib/auth/auth-provider'

const PERMISSIONS: Permission[] = []
const DISPLAY_NAME = 'AuthLayout'

export const Route: FC = () => {
  const { currentUser, userRole } = useAuthContext()

  if (currentUser) {
    if (userRole === USER_ROLE.TEACHER) {
      return <Navigate replace to="/teacher" />
    }
    if (userRole === USER_ROLE.GUARDIAN) {
      return <Navigate replace to="/dashboard" />
    }
  }

  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  )
}

const Component = createPage(Route, PERMISSIONS, <ForbiddenState />)

Route.displayName = `${DISPLAY_NAME}Page`
Component.displayName = DISPLAY_NAME

export { Component }
