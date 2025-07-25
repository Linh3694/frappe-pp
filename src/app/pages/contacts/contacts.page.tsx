import type { FC } from 'react'

import { Permission } from '@/core/utils/permission'
import { createPage } from '@/core/utils/route-guard'
import ForbiddenState from '@features/states/forbbiden-state'
import ContentPageLayout from '@templates/content-page.layout'
import ComingSoonState from '@features/states/coming-soon-state'


const PERMISSIONS: Permission[] = []
const DISPLAY_NAME = 'Contacts'

export const Route: FC = () => {
  return (
    <ContentPageLayout>
      <ComingSoonState />
    </ContentPageLayout>
  )
}

const Component = createPage(Route, PERMISSIONS, <ForbiddenState />)

Route.displayName = `${DISPLAY_NAME}Page`
Component.displayName = DISPLAY_NAME

export { Component }
