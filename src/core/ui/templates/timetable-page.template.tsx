import clsx from 'clsx'
import React, { HTMLAttributes, ReactNode } from 'react'
import { useResponsive } from '@/core/hooks'

type Props = HTMLAttributes<HTMLDivElement> & {
  timetable?: ReactNode
}

export default function TimetablePageTemplate({ className, timetable }: Props) {
  const { isDesktop } = useResponsive()

  return <div className={clsx(className)}>{timetable}</div>
}
