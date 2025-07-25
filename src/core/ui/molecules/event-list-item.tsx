import { HTMLAttributes, ReactNode, useMemo, useState, type FC } from 'react'
import { cn } from '@/core/utils/shadcn-utils'
import clsx from 'clsx'
import { differenceInDays, format } from 'date-fns'
import moment from 'moment'
import { useLocales } from '@/core/hooks'
import { getDateLocale } from '@/lib/utils/common'
import { dayOfWeekPalatte } from '@/core/constant/palette'
import { useTheme } from '@/lib/shadcn/theme-provider'
type Props = HTMLAttributes<HTMLDivElement> & EventListItemType & {}

export type EventListItemType = {
  title: string
  desc?: string
  date: string
}

export default function EventListItem({ className, title, desc, date }: Props) {
  const { t, currentLanguage } = useLocales()
  const { theme } = useTheme()
  const dateLocale = useMemo(
    () => getDateLocale(currentLanguage),
    [currentLanguage],
  )

  const eventDate = Date.parse(date)
  return (
    <div className={cn('flex gap-4', className)}>
      <div
        className={cn(
          'flex h-20 w-16 basis-[70px] flex-col overflow-hidden rounded-md   border bg-card shadow-md ',
          {
            'bg-card-foreground ': theme === 'dark',
          },
        )}
      >
        <div
          className="w-full text-center"
          style={{
            backgroundColor: dayOfWeekPalatte[new Date(date).getDay()].bg,
          }}
        >
          <span
            className="text-xs font-bold"
            style={{
              color: dayOfWeekPalatte[new Date(date).getDay()].text,
            }}
          >
            {format(eventDate, 'eeee', {
              locale: getDateLocale(currentLanguage),
            })}
          </span>
        </div>
        <div className="flex grow flex-col items-center justify-center">
          <div className="text-2xl font-semibold leading-6">
            {format(date, 'dd')}
          </div>
          <div className="text-sm leading-[16px] text-muted-foreground">
            {format(eventDate, 'MMM', {
              locale: getDateLocale(currentLanguage),
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <div className="text-sm text-muted-foreground">
          {differenceInDays(date, new Date())
            ? t('common.c_days_to_go', {
                count: differenceInDays(date, new Date()),
              })
            : t('common.tomorrow')}
        </div>
        <div className="line-clamp-2" title={title}>
          {title}
        </div>
        <div className="line-clamp-1 text-xs text-muted-foreground">{desc}</div>
        {/* <div className="text-sm text-gray-400">{format(date, 'hh:mm aa')}</div> */}
      </div>
    </div>
  )
}
