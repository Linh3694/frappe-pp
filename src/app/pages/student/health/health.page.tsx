import type { FC } from 'react'

import { Permission } from '@/core/utils/permission'
import { createPage } from '@/core/utils/route-guard'
import HealthPageTemplate from '@templates/health-page.template'
import ForbiddenState from '@features/states/forbbiden-state'
import ContentPageLayout from '@templates/content-page.layout'
import ListHealth from '@features/health/list-health'

const PERMISSIONS: Permission[] = []
const DISPLAY_NAME = 'Health'

export const Route: FC = () => {
  return (
    <ContentPageLayout>
      <HealthPageTemplate list={<ListHealth />} />
    </ContentPageLayout>
  )
}

const Component = createPage(Route, PERMISSIONS, <ForbiddenState />)

Route.displayName = `${DISPLAY_NAME}Page`
Component.displayName = DISPLAY_NAME

export { Component }
