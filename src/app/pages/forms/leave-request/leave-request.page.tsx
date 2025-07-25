import { useState, type FC } from 'react'

import { Permission } from '@/core/utils/permission'
import { createPage } from '@/core/utils/route-guard'
import { CheckCircle } from 'phosphor-react'
import { Button } from '@atoms/button'
import { Link } from 'react-router-dom'
import LeaveRequestPageTemplate from '@templates/leave-request-page.template'
import ForbiddenState from '@features/states/forbbiden-state'
import ContentPageLayout from '@templates/content-page.layout'
import LeaveRequestForm from '@features/attendance/leave-request-form'

const PERMISSIONS: Permission[] = []
const DISPLAY_NAME = 'LeaveRequest'

export const Route: FC = () => {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="mt-20 flex w-full flex-col items-center gap-4">
        <CheckCircle className="text-brand-teal" size={80} weight="fill" />
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Leave request submitted</p>
          <Link to="/student/attendance">
            <Button className="[background:var(--gradient-t-s)] hover:bg-brand-teal/90">
              View request
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <ContentPageLayout>
      <LeaveRequestPageTemplate form={<LeaveRequestForm />} />
    </ContentPageLayout>
  )
}

const Component = createPage(Route, PERMISSIONS, <ForbiddenState />)

Route.displayName = `${DISPLAY_NAME}Page`
Component.displayName = DISPLAY_NAME

export { Component }
