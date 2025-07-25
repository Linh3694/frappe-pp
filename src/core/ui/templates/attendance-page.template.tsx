import React, { HTMLAttributes, ReactNode } from 'react'
import MonitorBox from '../molecules/monitor-box'
import { CheckCircle, Clock, PauseCircle } from 'phosphor-react'
import CardList from '../molecules/card-list'
import RequestListItem from '../molecules/request-list-item'
import { cn } from '@/core/utils/shadcn-utils'
import { useLocales } from '@/core/hooks'

type Props = HTMLAttributes<HTMLDivElement> & {
  box_1?: ReactNode
  box_2?: ReactNode
  box_3?: ReactNode
  timeline?: ReactNode
  calendar?: ReactNode
}

export default function AttendancePageTemplate({
  className,
  box_1,
  box_2,
  box_3,
  timeline,
  calendar,
}: Props) {
  const {t} = useLocales()
  return (
    <div
      className={cn(' flex flex-col items-start gap-5 xl:gap-10 lg:flex-row', className)}
    >
      <div className="flex w-full flex-col md:basis-3/5 gap-5 xl:gap-10">
        <div className="space-y-5">
          <p className="text-xl font-bold text-primary">{t('common.overview')}</p>
          <div className="flex w-full flex-col sm:flex-row gap-3 xl:gap-10">
            <div className="md:basis-1/3">{box_1}</div>
            <div className="md:basis-1/3">{box_2}</div>
            <div className="md:basis-1/3">{box_3}</div>
          </div>
        </div>
        <div className="space-y-5">
          <p className="text-xl font-bold text-primary">{t('common.attendance_calendar')}</p>
          <div className="">{calendar}</div>
        </div>
      </div>
      <div className="w-full space-y-5 md:basis-2/5">
        <p className="text-xl font-bold text-primary">{t('common.attendance_timeline')}</p>
        {timeline}
      </div>
    </div>
  )
}
