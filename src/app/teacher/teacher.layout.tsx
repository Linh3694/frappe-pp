import ForbiddenState from '@features/states/forbbiden-state'
import { Permission } from '@/core/utils/permission'
import { createPage } from '@/core/utils/route-guard'
import { useContext, type FC } from 'react'

import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext, USER_ROLE } from '@/lib/auth/auth-provider'
import PageLayout from '@templates/page.layout'

import { TeacherProvider } from '@/lib/teacher/teacher-provider'
import NoPermissionState from '@features/states/no-permisson-state'
import { TeacherSideBar } from '@features/navigation/side-bar'
import { TeacherNavigationBar } from '@features/navigation/navigation-bar'

const PERMISSIONS: Permission[] = []
const DISPLAY_NAME = 'TeacherLayout'

export const Route: FC = () => {
  // const { currentUser, userRole, userInfo } = useContext(AuthContext)

  // if (!currentUser && userInfo === null) {
  //   return <Navigate replace to="/auth/login" />
  // }

  // if (currentUser && userRole === null) {
  //   return <NoPermissionState />
  // }

  return (
    <TeacherProvider>
      <PageLayout
        sidebar={<TeacherSideBar className="bg-background" />}
        bottom={<TeacherNavigationBar />}
      >
        <Outlet />
      </PageLayout>
    </TeacherProvider>
  )
}

const Component = createPage(Route, PERMISSIONS, <ForbiddenState />)

Route.displayName = `${DISPLAY_NAME}Page`
Component.displayName = DISPLAY_NAME

export { Component }
