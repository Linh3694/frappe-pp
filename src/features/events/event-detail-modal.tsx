import { HTMLAttributes, useMemo, useState, type FC } from 'react'
import { cn } from '@/core/utils/shadcn-utils'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@atoms/dialog'
import { useLocales, useResponsive } from '@/core/hooks'
import { SISAcademicYearEvent } from '@/types/SIS/SISAcademicYearEvent'
import { cleanPath, getDateLocale, toCapitalize } from '@/lib/utils/common'
import env from '@/config/env'
import { differenceInDays, format } from 'date-fns'
import { dayOfWeekPalatte } from '@/core/constant/palette'

export type EventDetailModalProps = HTMLAttributes<HTMLDivElement> & {
  disabled?: boolean
  data?: SISAcademicYearEvent
}

export const EventDetailModal: FC<EventDetailModalProps> = ({
  className,
  disabled,
  children,
  data,
}) => {
  const { t, currentLanguage } = useLocales()
  const { isDesktop } = useResponsive()
  const [open, setOpen] = useState(false)
  const dateLocale = useMemo(
    () => getDateLocale(currentLanguage),
    [currentLanguage],
  )

  return (
    <Dialog open={open} onOpenChange={($open) => !disabled && setOpen($open)}>
      <DialogTrigger className="text-start">{children}</DialogTrigger>
      <DialogContent
        className={cn(
          'w-[640px] max-w-[90vw] rounded-lg px-2 py-4 sm:p-6',
          className,
        )}
      >
        <DialogHeader className="text-xl font-bold text-primary">
          <DialogTitle>{t('common.event_details')}</DialogTitle>
        </DialogHeader>
        <div className="rou relative flex justify-between overflow-hidden rounded-lg bg-primary text-white">
          <div
            className="mb-5 ml-5 hidden flex-col justify-center rounded-bl-lg rounded-br-lg bg-brand-orange p-2 text-center sm:flex"
            style={{
              backgroundColor:
                data?.start_date &&
                dayOfWeekPalatte[new Date(data.start_date).getDay()].bg,
              color:
                data?.start_date &&
                dayOfWeekPalatte[new Date(data.start_date).getDay()].text,
            }}
          >
            <p className="text-4xl font-bold ">
              {data?.start_date &&
                format(Date.parse(data.start_date), 'dd', {
                  locale: dateLocale,
                })}
            </p>
            <p className="px-2 text-lg font-bold">
              {data?.start_date &&
                toCapitalize(
                  format(Date.parse(data.start_date), 'MMMM', {
                    locale: dateLocale,
                  }),
                )}
            </p>
          </div>
          <div className="flex flex-1 flex-wrap items-end justify-between gap-2 p-4 pt-8 sm:pt-16">
            <div className="">
              <p className="text-xl font-bold sm:text-2xl">
                {data?.start_date &&
                  format(Date.parse(data.start_date), 'eeee', {
                    locale: dateLocale,
                  })}
              </p>
              <p className="text-md sm:text-lg">
                {data?.start_date &&
                  toCapitalize(
                    format(Date.parse(data.start_date), 'PPP', {
                      locale: dateLocale,
                    }),
                  )}
              </p>
            </div>
            {data?.start_date && (
              <p className="sm:text-md text-sm opacity-70">
                {differenceInDays(data.start_date, new Date())
                  ? t('common.c_days_to_go', {
                      count: differenceInDays(data.start_date, new Date()),
                    })
                  : t('common.tomorrow')}
              </p>
            )}
          </div>
          <img
            alt="Torch in logo Wellspring SaiGon"
            className={`absolute right-[-20%] top-[-30%] opacity-5 sm:right-0`}
            src={cleanPath(`${env.ASSET_URL}/static/torch-white.png`)}
          />
        </div>
        <p className="mb-4 sm:text-lg">{data?.title}</p>
        {data?.description && (
          <p className="text-md text-muted-foreground">{data?.description}</p>
        )}
      </DialogContent>
    </Dialog>
  )
}
