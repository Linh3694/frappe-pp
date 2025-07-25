import clsx from 'clsx'
import React, { PropsWithChildren } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@atoms/sheet'
import NotificationTabs from './notification-tabs'

type Props = {
  className?: string
  data?: {
    class: any[]
    school: any[]
  }
}

export default function NotificationDrawer({
  className,
  children,
  data,
}: Props & PropsWithChildren) {
  return (
    <Sheet>
      <SheetTrigger className="relative">{children}</SheetTrigger>
      <SheetContent>
        <div className="space-y-4">
          <div className="text-lg font-bold">Notifications</div>
          <NotificationTabs />
        </div>
      </SheetContent>
    </Sheet>
  )
}
