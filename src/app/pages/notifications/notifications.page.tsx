import type { FC } from 'react'

import { Permission } from '@/core/utils/permission'
import { createPage } from '@/core/utils/route-guard'
import { classNoti, schoolNoti } from '@/mock-data/notification.json'
import ForbiddenState from '@features/states/forbbiden-state'
import ContentPageLayout from '@templates/content-page.layout'
import NotificationPageTemplate from '@templates/notification-page.template'
import NotificationTabs from '@features/notification/notification-tabs'
const PERMISSIONS: Permission[] = []
const DISPLAY_NAME = 'Notifications'

export const Route: FC = () => {
  
  return (
    <ContentPageLayout>
      <NotificationPageTemplate list={<NotificationTabs />} />
    </ContentPageLayout>
  )
}

const Component = createPage(Route, PERMISSIONS, <ForbiddenState />)

Route.displayName = `${DISPLAY_NAME}Page`
Component.displayName = DISPLAY_NAME

export { Component }
