import { HTMLAttributes, type FC } from 'react'
import { cn } from '@/core/utils/shadcn-utils'
import { Timeline } from '@molecules/timeline'
import { useGetTimetable } from '@/api/timetable/use-get-timetable'
import { format, isSameDay } from 'date-fns'
import { coursePalatte } from '@/core/constant/palette'
import { stringHashToNumber } from '@/lib/utils/common'
import { darken, lighten } from 'polished'
import { useTheme } from '@/lib/shadcn/theme-provider'
import { useLocales } from '@/core/hooks'
import { Loader2 } from 'lucide-react'
import moment from 'moment'

export type TodayScheduleProps = HTMLAttributes<HTMLDivElement> & {
  person?: string
}

export const TodaySchedule: FC<TodayScheduleProps> = ({
  className,
  person,
}) => {
  const { t } = useLocales()
  const { theme } = useTheme()
  const { timetable, isLoading } = useGetTimetable(
    {
      personId: person,
      startDate: format(new Date(), 'yyyy-MM-dd'),
    },
    !person,
  )
  const periods = timetable?.periods
    .filter((p) => isSameDay(p.date, new Date()))
    .map((p) => ({
      start: moment(`${p.date} ${p.timeStart}`,"yyyy-MM-dd HH:mm:ss").toDate(),
      end: moment(`${p.date} ${p.timeEnd}`,"yyyy-MM-dd HH:mm:ss").toDate(),
      // start: new Date(),
      // end: new Date(),
      extend: p,
    }))
  // console.log(periods)

  return (
    <div className={cn(className)}>
      {((!periods && !isLoading) || periods?.length === 0) && (
        <p>{t('components.notification.no_period_today.description')}</p>
      )}
      {!periods && isLoading && (
        <div className="text-center">
          <div className="inline-flex items-center gap-1">
            <Loader2 className="mr-2 h-6 w-6 animate-spin text-primary" />
            <span className="font-semibold text-primary ">
              {t('common.loading')}
            </span>
          </div>
        </div>
      )}
      <Timeline
        items={periods}
        itemContent={(item) => (
          <div
            className="w-full rounded-md border-l-4 px-5 py-3"
            style={{
              backgroundColor: darken(
                theme === 'dark' ? 0.7 : 0,
                coursePalatte[
                  stringHashToNumber(item.courseClassID, coursePalatte.length)
                ].bg,
              ),
              borderColor: darken(
                theme === 'dark' ? 0.5 : 0.2,
                coursePalatte[
                  stringHashToNumber(item.courseClassID, coursePalatte.length)
                ].bg,
              ),
              color: lighten(
                theme === 'dark' ? 0.2 : 0,
                coursePalatte[
                  stringHashToNumber(item.courseClassID, coursePalatte.length)
                ].text,
              ),
            }}
          >
            <span className="line-clamp-1" title={item.courseClassTitle}>
              {item.courseClassTitle}
            </span>
          </div>
        )}
      />
    </div>
  )
}
