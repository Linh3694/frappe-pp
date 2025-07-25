import { cn } from '@/core/utils/shadcn-utils'
import React, { HTMLAttributes, ReactNode } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & NotificationListItemType & {

}

export type NotificationListItemType = {
  title: ReactNode
  desc: ReactNode
  date: ReactNode
  unread?: boolean
}

export default function NotificationListItem({ className, title, desc, date, unread }: Props) {

  return (
    <div className={cn(className)}>
      <div className="relative flex items-center justify-between gap-4 py-4 pl-2">
        {unread && (
          <div className="absolute -left-3 top-[50%] h-fit w-fit rounded-full bg-brand-red p-1" />
        )}
        <div>
          <div className="text-xs text-gray-500">{date}</div>
          <div className="font-semibold">{title}</div>
          <div className="text-xs text-gray-500">{desc}</div>
        </div>
      </div>
    </div>
  )
}
