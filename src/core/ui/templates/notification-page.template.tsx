import clsx from 'clsx'
import React, { HTMLAttributes, ReactNode } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
  list?: ReactNode
}

export default function NotificationPageTemplate({ className, list }: Props) {
  return (
    <div className={clsx(className)}>
      {list}
    </div>
  )
}
