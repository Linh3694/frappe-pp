import { cn } from '@/core/utils/shadcn-utils'
import { HTMLAttributes, useState, type FC } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@atoms/popover'
import { Button } from '@atoms/button'
import { CalendarIcon, Dot } from 'lucide-react'
import { format } from 'date-fns'
import { Calendar } from '@atoms/calendar'
import { CaretDown, DotsThree } from 'phosphor-react'
import { Separator } from '@atoms/separator'
import styled from 'styled-components'
import { useGetAttendanceStudentTimeline } from '@/api/attendance/use-get-attendance-student-timeline'
import { useChildren } from '@/lib/student/children-provider'
import { Alert } from '@atoms/alert'
import AlertStatus from '@molecules/alert-status'
import { AttendanceCode } from '@/types/Extends/Attendance'
import DateTimePicker from '@molecules/date-time-picker'
import { useLocales } from '@/core/hooks'
import { getDateLocale, toCapitalize } from '@/lib/utils/common'
import { useTheme } from '@/lib/shadcn/theme-provider'

export type AttendanceTimelineProps = HTMLAttributes<HTMLDivElement> & {}

const TimeLineStyled = styled.div`
  .milestone:not(:last-child) .dot {
    position: relative;
    &:after {
      content: '';
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin: auto;
      width: 0;
      height: 45px;
      /* background-color: #000; */
      border: 0.5px dashed hsl(var(--primary));
      transform: translateY(-10px);
    }
  }
`

export const AttendanceTimeline: FC<AttendanceTimelineProps> = ({
  className,
}) => {
  const { t, currentLanguage } = useLocales()
  const { theme } = useTheme()
  const { current } = useChildren()
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false)
  const [date, setDate] = useState<Date>(new Date())
  const { timeline } = useGetAttendanceStudentTimeline({
    personId: current?.person_id,
    date: format(date, 'yyyy-MM-dd'),
  },!current?.person_id)

  const handleSelectDate = (date?: Date) => {
    date && setDate(date)
    setOpenDatePicker(false)
  }

  return (
    <div
      className={cn(
        'w-full rounded-xl border p-5 xl:p-10 ',
        {
          'border-brand-primary/20 bg-brand-blue/10': theme === 'light',
          'border-line bg-card': theme === 'dark',
        },
        className,
      )}
    >
      <div className="w-full">
        <DateTimePicker value={date} onChange={handleSelectDate}>
          <div className="cursor-pointer">
            <span className="flex items-center gap-0">
              <span className="mr-2 text-lg font-semibold text-brand-secondary">
                {date ? (
                  toCapitalize(
                    format(date, 'PPP', {
                      locale: getDateLocale(currentLanguage),
                    }),
                  )
                ) : (
                  <span>{t('component.inputs.select.placeholder')}</span>
                )}
              </span>
              <CaretDown className="ml-2 h-4 w-4 text-brand-secondary" />
            </span>
          </div>
        </DateTimePicker>
      </div>
      <TimeLineStyled className="mt-5 flex flex-col gap-5">
        {timeline?.map((item) => (
          <div className="milestone flex items-center gap-1">
            <span
              className={cn(
                'rounded-full px-5 py-1 text-xs font-semibold text-primary',
                {
                  'bg-brand-blue/20': theme === 'light',
                  'bg-primary/20 text-foreground': theme === 'dark',
                },
              )}
            >
              {format(item.creation, 'HH:mm')}
            </span>
            <div className="dot">
              <Dot size={40} className="text-primary" />
            </div>
            <div>
              <p
                className="text-md line-clamp-1 text-primary xl:text-lg"
                title={
                  item.parent.school_class?.title ||
                  item.parent.course_class?.title
                }
              >
                {item.parent.school_class?.title ||
                  item.parent.course_class?.title}
              </p>
              {item.attendance_code === AttendanceCode.PRESENT && (
                <p className="text-sm text-brand-green">
                  {t('common.present')}
                </p>
              )}
              {item.attendance_code === AttendanceCode.EXCUSED_ABSENCE && (
                <p className="text-sm text-brand-teal">
                  {t('common.excused_absence')}
                </p>
              )}
              {item.attendance_code === AttendanceCode.UNEXCUSED_ABSENCE && (
                <p className="text-sm text-brand-red">
                  {t('common.unexcused_absence')}
                </p>
              )}
              {item.attendance_code === AttendanceCode.LATE && (
                <p className="text-sm text-brand-orange">{t('common.late')}</p>
              )}
              {item.reason && (
                <p className="text-xs text-muted-foreground">
                  {t('common.reason_t', { text: item.reason })}
                </p>
              )}
            </div>
          </div>
        ))}
      </TimeLineStyled>
      {timeline?.length === 0 && (
        <p>{t('components.notification.no_attendance.description')}</p>
      )}
    </div>
  )
}
