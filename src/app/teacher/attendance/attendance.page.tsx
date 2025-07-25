import { useLayoutEffect, useState, type FC } from 'react'
import { Permission } from '@/core/utils/permission'
import { createPage } from '@/core/utils/route-guard'
import { useLocales, useResponsive } from '@/core/hooks'
import ForbiddenState from '@features/states/forbbiden-state'
import FeedPageTemplate from '@templates/feed-page.template'
import ContentPageLayout from '@templates/content-page.layout'
import FeedInfiniteScroll from '@features/feed/feed-infinite-scroll'
import { Card } from '@atoms/card'
import { Book, Check, CheckCircle, House, UsersFour } from 'phosphor-react'
import PanelLink from '@molecules/panel-link'
import { useTeacher } from '@/lib/teacher/teacher-provider'
import { useNavigate } from 'react-router-dom'

const PERMISSIONS: Permission[] = []
const DISPLAY_NAME = 'Feed'

export const Route: FC = () => {
  const navigate = useNavigate()
  const { t } = useLocales()
  const { isDesktop } = useResponsive()
  const { schoolClasses, courseClasses } = useTeacher()

  useLayoutEffect(() => {
    if (schoolClasses && courseClasses) {
      if (schoolClasses?.length > 0 && courseClasses?.length === 0) {
        navigate(`/teacher/attendance/classes`)
      }
      if (courseClasses?.length > 0 && schoolClasses?.length === 0) {
        navigate(`/teacher/attendance/subjects`)
      }
    }
  }, [schoolClasses, courseClasses])

  return (
    <ContentPageLayout titlePage={t('components.menu.attendance')}>
      <div className="m-auto max-w-xl">
        <div className="flex flex-col gap-5">
          <PanelLink
            icon={
              <>
                <UsersFour
                  size={isDesktop ? 100 : 70}
                  weight="duotone"
                  className="text-card-foreground"
                />
                <House
                  size={isDesktop ? 50 : 30}
                  weight="light"
                  className="absolute bottom-0 left-0 right-0 top-0 m-auto rounded-full border-2 border-brand-secondary bg-card px-1 text-brand-secondary"
                />
              </>
            }
            title={t('common.attendance_by_classes')}
            desc={t('common.attendance_by_classes_desc')}
            to="/teacher/attendance/classes"
            disabled={schoolClasses?.length === 0}
            className="bg-card"
          />
          <PanelLink
            icon={
              <>
                <UsersFour
                  size={isDesktop ? 100 : 70}
                  weight="duotone"
                  className="text-card-foreground"
                />
                <Book
                  size={isDesktop ? 50 : 30}
                  weight="light"
                  className="absolute bottom-0 left-0 right-0 top-0 m-auto rounded-full border-2 border-brand-secondary bg-card px-1 text-brand-secondary"
                />
              </>
            }
            title={t('common.attendance_by_subjects')}
            desc={t('common.attendance_by_subjects_desc')}
            to="/teacher/attendance/subjects"
            disabled={courseClasses?.length === 0}
            className="bg-card"
          />
        </div>
      </div>
    </ContentPageLayout>
  )
}

const Component = createPage(Route, PERMISSIONS, <ForbiddenState />)

Route.displayName = `${DISPLAY_NAME}Page`
Component.displayName = DISPLAY_NAME

export { Component }
