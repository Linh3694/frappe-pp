import { HTMLAttributes, ReactNode, type FC } from 'react'
import { cn } from '@/core/utils/shadcn-utils'
import { useLocales, useResponsive } from '@/core/hooks'
import { useTheme } from '@/lib/shadcn/theme-provider'

type ParentDashboardTemplateProps = HTMLAttributes<HTMLDivElement> & {
  studentSwitcher?: ReactNode
  semeterOverview?: ReactNode
  navigationBoard?: ReactNode
  news?: ReactNode
  upcomingEvents?: ReactNode
}

export const ParentDashboardTemplate: FC<ParentDashboardTemplateProps> = ({
  className,
  studentSwitcher,
  semeterOverview,
  navigationBoard,
  news,
  upcomingEvents,
}) => {
  const { isDesktop } = useResponsive()
  return (
    <div
      className={cn(
        'grid grid-cols-4 grid-rows-[min-content_1fr] place-content-stretch place-items-stretch gap-4 xl:grid-cols-3',
        className,
      )}
    >
      <div className="col-span-4 lg:col-span-2 xl:col-span-1 xl:col-start-1 xl:row-start-1">
        <div className="flex h-full">{studentSwitcher}</div>
      </div>
      <div className="col-span-4 lg:col-span-2 xl:col-span-1 xl:col-start-2 xl:row-start-1">
        <div className="flex h-full">{semeterOverview}</div>
      </div>
      {!isDesktop && (
        <div className="col-span-4 row-start-3">{navigationBoard}</div>
      )}
      <div className="col-span-4 xl:col-span-2 xl:row-start-2">{news}</div>
      <div className="col-span-4 xl:col-span-1 xl:col-start-3 xl:row-span-2 xl:row-start-1">
        {upcomingEvents}
      </div>
    </div>
  )
}

type TeacherDashboardTemplateProps = HTMLAttributes<HTMLDivElement> & {
  officialClass?: ReactNode
  courses?: ReactNode
  schedule?: ReactNode
  navigationBoard?: ReactNode
}

export const TeacherDashboardTemplate: FC<TeacherDashboardTemplateProps> = ({
  className,
  officialClass,
  courses,
  schedule,
  navigationBoard,
}) => {
  const { t } = useLocales()
  const { theme } = useTheme()
  const { isDesktop } = useResponsive()
  return (
    <div className={cn('flex flex-col gap-4 md:gap-10 lg:flex-row', className)}>
      <div className="flex flex-col gap-3 md:gap-7 lg:w-[60%]">
        {officialClass && (
          <div className="flex w-full flex-col gap-3">
            <p className="text-xl font-bold text-primary">
              {t('common.my_class')}
            </p>
            {officialClass}
          </div>
        )}
        <div className="flex w-full flex-col gap-3">
          <p className="text-xl font-bold text-primary">
            {t('common.my_courses')}
          </p>
          {courses}
        </div>
      </div>
      {!isDesktop && (
        <div className="">{navigationBoard}</div>
      )}
      <div className="flex-1">
        <p className="mb-3 text-xl font-bold text-primary">
          {t('common.today_schedule')}
        </p>
        <div
          className={cn(
            'rounded-lg border-2 border-dashed border-brand-orange p-5',
            { 'border-primary/50': theme === 'dark' },
          )}
        >
          {schedule}
        </div>
      </div>
    </div>
  )
}
