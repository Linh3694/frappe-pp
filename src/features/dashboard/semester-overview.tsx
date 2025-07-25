import { Progress } from '@atoms/progress'
import { HTMLAttributes, type FC } from 'react'
import { Exam } from 'phosphor-react'
import { Separator } from '@atoms/separator'
import { cn } from '@/core/utils/shadcn-utils'
import { useLocales } from '@/core/hooks'
import { differenceInWeeks, format } from 'date-fns'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { UpcomingEvents } from './upcoming-events'
import { useGetCurrentSchoolYear } from '@/api/schoolYear/use-get-current-school-year'
import { getDateLocale } from '@/lib/utils/common'

export type SemesterOverviewProps = HTMLAttributes<HTMLDivElement> & {}

export const SemesterOverview: FC<SemesterOverviewProps> = ({ className }) => {
  const { t, currentLanguage } = useLocales()
  const { schoolYear } = useGetCurrentSchoolYear()

  const currentWeeks =
    (schoolYear?.first_day &&
      Math.max(
        differenceInWeeks(new Date(), new Date(schoolYear.first_day)),
        0,
      )) ||
    0
  const totalWeeks =
    (schoolYear?.last_day &&
      schoolYear?.first_day &&
      differenceInWeeks(
        new Date(schoolYear.last_day),
        new Date(schoolYear.first_day),
      )) ||
    0

  return (
    <div
      className={cn(
        'w-full rounded-lg border bg-card py-2 px-4 shadow-sm',
        className,
      )}
    >
      <div>
        {/* <div className="text-lg font-semibold text-primary">
          {`${t('academy_overview.title')} ${schoolYear?.title}`}
        </div> */}
        {/* <div className="text-gray-4000 text-sm">
          {t('academy_overview.description')}
        </div> */}
      </div>
      <div className="mt-2 flex flex-col gap-1">
        <div className="text-xl font-bold text-brand-secondary">
          {schoolYear?.title}
        </div>
        <div className="flex items-end justify-between">
          {schoolYear?.first_day && (
            <div className="text-xs text-gray-400">
              {t('common.start_from_d', {
                date: format(new Date(schoolYear.first_day), 'PP', {
                  locale: getDateLocale(currentLanguage),
                }),
              })}
            </div>
          )}
          {schoolYear && (
            <div className="space-x-2 text-md font-bold text-brand-orange">
              {t('common.week_w', { week: currentWeeks })}
              <span className="ml-1 text-sm text-gray-400">
                /<span className="ml-1">{totalWeeks}</span>
              </span>
            </div>
          )}
        </div>

        <ProgressPrimitive.Root
          className={cn(
            'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
            className,
          )}
        >
          <ProgressPrimitive.Indicator
            className="h-full flex-1 transition-all [background:var(--gradient-o-y)]"
            style={{ width: `${(currentWeeks / totalWeeks) * 100}%` }}
          />
        </ProgressPrimitive.Root>
        {schoolYear?.last_day && (
          <div className="self-end text-xs text-gray-400">
            {t('common.ends_on_d', {
              date: format(new Date(schoolYear.last_day), 'PP', {
                locale: getDateLocale(currentLanguage),
              }),
            })}
          </div>
        )}
      </div>
      {/* <div className="mt-4 flex gap-4">
        <Exam size={48} className="text-gray-400" />
        <div>
          <div className="text-3xl font-bold text-brand-orange">
            145{' '}
            <span className="text-base font-normal text-gray-400">
              {t('day_other')}
            </span>
          </div>
          <div className="text-gray-400">
            {t('academy_overview.until_end_term_exam')}
          </div>
        </div>
      </div> */}
    </div>
  )
}
