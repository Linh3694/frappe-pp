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
  const { currentUser, userRole, isLoading } = useAuthContext()

  // Đợi cho đến khi loading xong mới check redirect
  if (isLoading) {
    return (
      <AuthLayout>
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
          </div>
        </div>
      </AuthLayout>
    )
  }

  // Simple redirect logic - auth provider handles main navigation
  if (currentUser && userRole) {
    console.log('🔄 Auth layout: User logged in, should redirect via provider')
    
    if (userRole === USER_ROLE.TEACHER) {
      return <Navigate replace to="/teacher" />
    }
    if (userRole === USER_ROLE.GUARDIAN) {
      return <Navigate replace to="/dashboard" />
    }
  }
  
  // If user is logged in but no role yet, wait
  if (currentUser && !userRole) {
    return (
      <AuthLayout>
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-sm text-muted-foreground">Determining user role...</p>
          </div>
        </div>
      </AuthLayout>
    )
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
