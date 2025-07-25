import type { FC } from 'react'

import { Permission } from '@/core/utils/permission'
import { createPage } from '@/core/utils/route-guard'
import { Avatar, AvatarFallback, AvatarImage } from '@atoms/avatar'
import { AttendanceOverview } from './components/attendance-overview'
import { StudentActions } from './components/student-actions'
import ForbiddenState from '@features/states/forbbiden-state'
import ContentPageLayout from '@templates/content-page.layout'
import ComingSoonState from '@templates/coming-soon-state'

const PERMISSIONS: Permission[] = []
const DISPLAY_NAME = 'Overview'

export const Route: FC = () => {
  return (
    <ContentPageLayout className="max-w-2xl">
      <ComingSoonState />
    </ContentPageLayout>
  )
  // return (
  //   <div className="flex flex-col gap-6">
  //     <div className="flex gap-2">
  //       <Avatar className="w-16 h-16">
  //         <AvatarImage src="https://github.com/shadcn.png" />
  //         <AvatarFallback>CN</AvatarFallback>
  //       </Avatar>
  //       <div>
  //         <div className="text-xl font-semibold">Nguyen Minh Anh</div>
  //         <div className="text-gray-500">Class 11.05</div>
  //       </div>
  //     </div>
  //     <AttendanceOverview />
  //     <StudentActions />
  //   </div>
  // );
}

const Component = createPage(Route, PERMISSIONS, <ForbiddenState />)

Route.displayName = `${DISPLAY_NAME}Page`
Component.displayName = DISPLAY_NAME

export { Component }
