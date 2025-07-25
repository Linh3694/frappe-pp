import ForbiddenState from '@features/states/forbbiden-state'
import { Permission } from '@/core/utils/permission'
import { createPage } from '@/core/utils/route-guard'
import { useContext, type FC } from 'react'

import { Navigate, Outlet } from 'react-router-dom'
import { ParentSideBar } from '@features/navigation/side-bar'
import PageLayout from '@templates/page.layout'
import { AuthContext, useAuthContext, USER_ROLE } from '@/lib/auth/auth-provider'
import ServerErrorState from '@features/states/server-error-state'
import { ChildrenProvider } from '@/lib/student/children-provider'
import NoPermissionState from '@features/states/no-permisson-state'
import { ParentNavigationBar } from '@features/navigation/navigation-bar'

const PERMISSIONS: Permission[] = []
const DISPLAY_NAME = 'PageLayout'

export const Route: FC = () => {
  // const { currentUser, userRole, userInfo } = useAuthContext()

  // if (!currentUser && userInfo === null) {
  //   return <Navigate replace to="/auth/login" />
  // }
  // if (currentUser && userRole === null) {
  //   return <NoPermissionState />
  // }

  return (
    <ChildrenProvider>
      <PageLayout
        sidebar={<ParentSideBar />}
        bottom={<ParentNavigationBar />}
      >
        <Outlet />
      </PageLayout>
    </ChildrenProvider>
  )
}

const Component = createPage(Route, PERMISSIONS, <ForbiddenState />)

Route.displayName = `${DISPLAY_NAME}Page`
Component.displayName = DISPLAY_NAME

export { Component }
