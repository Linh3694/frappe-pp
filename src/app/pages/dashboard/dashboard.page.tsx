import type { FC } from 'react'

import { Permission } from '@/core/utils/permission'
import { createPage } from '@/core/utils/route-guard'
import { useLocales, useResponsive } from '@/core/hooks'
import ForbiddenState from '@features/states/forbbiden-state'
import MonitorBox from '@molecules/monitor-box'
import { ClipboardText, User } from 'phosphor-react'
import StudentManagement from '@features/navigation/student-management'
import ContentPageLayout from '@templates/content-page.layout'
import { SemesterOverview } from '@features/dashboard/semester-overview'
import { StudentCard } from '@features/student/student-card'
import NewsList from '@features/news/news-list'
import { UpcomingEvents } from '@features/dashboard/upcoming-events'
import { ParentDashboardTemplate } from '@templates/dashboard-page.template'

const PERMISSIONS: Permission[] = []
const DISPLAY_NAME = 'Home'

export const Route: FC = () => {
  const { t } = useLocales()
  const { isDesktop } = useResponsive()

  return (
    <ContentPageLayout titlePage={t('components.menu.dashboard')}>
      <ParentDashboardTemplate
        studentSwitcher={<StudentCard size="large" />}
        semeterOverview={<SemesterOverview/>}
        navigationBoard={<StudentManagement />}
        news={<NewsList />}
        upcomingEvents={<UpcomingEvents/>}
      />
    </ContentPageLayout>
  )
}

const Component = createPage(Route, PERMISSIONS, <ForbiddenState />)

Route.displayName = `${DISPLAY_NAME}Page`
Component.displayName = DISPLAY_NAME

export { Component }
