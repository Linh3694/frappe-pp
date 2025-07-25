import type { FC } from 'react'

import { Permission } from '@/core/utils/permission'
import { createPage } from '@/core/utils/route-guard'
import ForbiddenState from '@features/states/forbbiden-state'
import { useLocales, useResponsive } from '@/core/hooks'
import ContentPageLayout from '@templates/content-page.layout'
import { TeacherDashboardTemplate } from '@templates/dashboard-page.template'
import { OfficialClassCard } from '@features/dashboard/official-class-card'
import { CoursesSlider } from '@features/dashboard/courses-slider'
import { useAuthContext } from '@/lib/auth/auth-provider'
import { TodaySchedule } from '@features/dashboard/today-schedule'
import TeacherManagement from '@features/navigation/teacher-management'

const PERMISSIONS: Permission[] = []
const DISPLAY_NAME = 'Dashboard'

export const Route: FC = () => {
  const { t } = useLocales()
  const { isDesktop } = useResponsive()
  const {userInfo} = useAuthContext()

  return (
    <ContentPageLayout titlePage={t('components.menu.dashboard')}>
      <TeacherDashboardTemplate
        officialClass={<OfficialClassCard />}
        courses={<CoursesSlider />}
        schedule={<TodaySchedule person={userInfo?.name}/>}
        navigationBoard={<TeacherManagement />}
      />
    </ContentPageLayout>
  )
}

const Component = createPage(Route, PERMISSIONS, <ForbiddenState />)

Route.displayName = `${DISPLAY_NAME}Page`
Component.displayName = DISPLAY_NAME

export { Component }
