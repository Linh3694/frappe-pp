import type { FC } from 'react'
import { Permission } from '@/core/utils/permission'
import { createPage } from '@/core/utils/route-guard'
import ForbiddenState from '@features/states/forbbiden-state'
import ContentPageLayout from '@templates/content-page.layout'
import MonitorBox from '@molecules/monitor-box'
import {
  CalendarCheck,
  CalendarX,
  CheckCircle,
  Clock,
  PauseCircle,
} from 'phosphor-react'
import ListRequest from '@features/attendance/list-requests'
import AttendancePageTemplate from '@templates/attendance-page.template'
import { Calendar } from '@atoms/calendar'
import { AttendanceCalendar } from '@features/attendance/attendance-calendar'
import { AttendanceTimeline } from '@features/attendance/attendance-timeline'
import { useLocales, useResponsive } from '@/core/hooks'
import { useGetAttendanceStudentSummary } from '@/api/attendance/use-get-attendance-student-summary'
import { useChildren } from '@/lib/student/children-provider'
import { cn } from '@/core/utils/shadcn-utils'

const PERMISSIONS: Permission[] = []
const DISPLAY_NAME = 'Attendance'

export const Route: FC = () => {
  const { t } = useLocales()
  const { isDesktop } = useResponsive()
  const { current } = useChildren()
  const { summary } = useGetAttendanceStudentSummary(
    {
      personId: current?.person_id,
    },
    !current?.person_id,
  )

  return (
    <ContentPageLayout titlePage={t('components.menu.attendance')}>
      <AttendancePageTemplate
        box_1={
          <MonitorBox
            className="rounded-2xl border border-brand-orange/30 bg-brand-orange/5 p-3 md:py-7"
            label={
              <span className="font-medium text-brand-orange">
                {t('common.late')}
              </span>
            }
            icon={
              <div className="rounded-xl bg-brand-orange/10 p-2 md:p-4">
                <Clock
                  size={isDesktop ? 30 : 20}
                  className="text-brand-orange"
                  weight="regular"
                />
              </div>
            }
            variant={isDesktop ? 'vertical' : 'horizontal'}
          >
            <div className="mx-5 text-2xl font-bold text-brand-orange md:text-4xl">
              {summary?.late}
            </div>
          </MonitorBox>
        }
        box_2={
          <MonitorBox
            className="rounded-2xl border border-brand-teal/30 bg-brand-teal/5 p-3 md:py-7 "
            label={
              <span className="font-medium text-brand-teal">
                {t('common.excused_absence')}
              </span>
            }
            icon={
              <div className="rounded-xl bg-brand-teal/10 p-2 md:p-4">
                <CalendarCheck
                  size={isDesktop ? 30 : 20}
                  className="text-brand-teal"
                  weight="regular"
                />
              </div>
            }
            variant={isDesktop ? 'vertical' : 'horizontal'}
          >
            <div className="mx-5 text-2xl font-bold text-brand-teal md:text-4xl">
              {summary?.authorized_absent}
            </div>
          </MonitorBox>
        }
        box_3={
          <MonitorBox
            className="rounded-2xl border border-brand-red/30 bg-brand-red/5 p-3 md:py-7"
            label={
              <span className="font-medium text-brand-red">
                {t('common.unexcused_absence')}
              </span>
            }
            icon={
              <div className="rounded-xl bg-brand-red/10 p-2 md:p-4">
                <CalendarX
                  size={isDesktop ? 30 : 20}
                  className="text-brand-red"
                  weight="regular"
                />
              </div>
            }
            variant={isDesktop ? 'vertical' : 'horizontal'}
          >
            <div className="mx-5 text-2xl font-bold text-brand-red md:text-4xl">
              {summary?.unauthorized_absent}
            </div>
          </MonitorBox>
        }
        calendar={
          <AttendanceCalendar
            className={cn('rounded-xl border md:bg-card md:p-5')}
          />
        }
        timeline={<AttendanceTimeline />}
      />
    </ContentPageLayout>
  )
}

const Component = createPage(Route, PERMISSIONS, <ForbiddenState />)

Route.displayName = `${DISPLAY_NAME}Page`
Component.displayName = DISPLAY_NAME

export { Component }
