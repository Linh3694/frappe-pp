import type { FC } from 'react'

import { Permission } from '@/core/utils/permission'
import { createPage } from '@/core/utils/route-guard'
import ForbiddenState from '@features/states/forbbiden-state'
import ContentPageLayout from '@templates/content-page.layout'
import { useTheme } from '@/lib/shadcn/theme-provider'

const PERMISSIONS: Permission[] = []
const DISPLAY_NAME = 'Handbook'

export const Route: FC = () => {
  const { theme } = useTheme()
  return (
    <ContentPageLayout containerFluid className="!p-0">
      <iframe
        src={`https://handbook-517r.vercel.app/?mode=${theme}`}
        style={{ width: '100%', height: '100%' }}
      />
    </ContentPageLayout>
  )
}

const Component = createPage(Route, PERMISSIONS, <ForbiddenState />)

Route.displayName = `${DISPLAY_NAME}Page`
Component.displayName = DISPLAY_NAME

export { Component }
