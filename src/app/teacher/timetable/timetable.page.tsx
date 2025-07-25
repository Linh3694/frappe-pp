import type { FC } from 'react'
import { Permission } from '@/core/utils/permission'
import { createPage } from '@/core/utils/route-guard'
import TimetablePageTemplate from '@templates/timetable-page.template'
import ForbiddenState from '@features/states/forbbiden-state'
import ContentPageLayout from '@templates/content-page.layout'
import { useLocales, useResponsive } from '@/core/hooks'
import { TeacherTimetableDayPicker } from '@features/timetable/timetable-day-picker'
import { useAuthContext } from '@/lib/auth/auth-provider'
import { TeacherTimetableFullCalendar } from '@features/timetable/timetable-full-calendar'

const PERMISSIONS: Permission[] = []
const DISPLAY_NAME = 'Timetable'

export const Route: FC = () => {
  const {t} = useLocales()
  const { isDesktop } = useResponsive()

  return (
    <ContentPageLayout  titlePage={t('components.menu.timetable')}>
      <TimetablePageTemplate
        timetable={isDesktop ? <TeacherTimetableFullCalendar /> : <TeacherTimetableDayPicker />}
      />
    </ContentPageLayout>
  )
}

const Component = createPage(Route, PERMISSIONS, <ForbiddenState />)

Route.displayName = `${DISPLAY_NAME}Page`
Component.displayName = DISPLAY_NAME

export { Component }
