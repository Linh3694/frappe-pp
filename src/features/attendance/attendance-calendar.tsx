import { useGetAttendanceStudentCalendar } from '@/api/attendance/use-get-attendance-student-calendar'
import { useLocales } from '@/core/hooks'
import { cn } from '@/core/utils/shadcn-utils'
import { useChildren } from '@/lib/student/children-provider'
import { getDateLocale } from '@/lib/utils/common'
import { AttendanceCode } from '@/types/Extends/Attendance'
import { Calendar } from '@atoms/calendar'
import { endOfMonth, format, isSameDay, startOfMonth } from 'date-fns'
import { Dot } from 'lucide-react'
import { HTMLAttributes, useState, type FC } from 'react'
import { type DayContentProps } from 'react-day-picker'
import styled from 'styled-components'

export type AttendanceCalendarProps = HTMLAttributes<HTMLDivElement> & {}

export function CustomDayContent(
  props: DayContentProps & {
    events?: {
      present?: number[]
      excused?: number[]
      unexcused?: number[]
      late?: number[]
    }
  },
) {
  return (
    <div
      className={cn('h-[36px] w-[36px] rounded-full leading-[36px]', {
        'bg-brand-primary text-white outline-2': isSameDay(
          props.date,
          new Date(),
        ),
        'bg-brand-green/60 text-white': props.events?.present?.includes(
          props.date.getDate(),
        ),
        'bg-brand-red/60 text-white': props.events?.unexcused?.includes(
          props.date.getDate(),
        ),
        'bg-brand-teal/60 text-white': props.events?.excused?.includes(
          props.date.getDate(),
        ),
        'bg-brand-orange text-black': props.events?.late?.includes(
          props.date.getDate(),
        ),
      })}
    >
      {props.date.getDate()}
    </div>
  )
}

const CalendarStyled = styled(Calendar)`
  & > div,
  & > div > div {
    width: 100%;
  }
  & table {
    .rdp-head tr,
    .rdp-tbody tr {
      justify-content: space-around;
    }
  }
`

export const AttendanceCalendar: FC<AttendanceCalendarProps> = ({
  className,
}) => {

  const { t, currentLanguage } = useLocales()
  const { current } = useChildren()
  const [date, setDate] = useState<Date>(new Date())
  const { report } = useGetAttendanceStudentCalendar({
    personId: current?.person_id,
    firstDay: format(startOfMonth(date), 'yyyy-MM-dd'),
    lastDay: format(endOfMonth(date), 'yyyy-MM-dd'),
  },!current?.person_id)
  const ReportGrouped = report?.reduce<Record<string, number[]>>(
    (prev, item) => {
      if (!prev[item.attendance_code]) {
        prev[item.attendance_code] = []
      }
      prev[item.attendance_code].push(Number(new Date(item.date).getDate()))
      return prev
    },
    {},
  )

  // console.log(report, ReportGrouped)
  // return null
  return (
    <div className={cn('w-full', className)}>
      <div className="mb-5 flex flex-wrap rounded-xl bg-card-foreground">
        <div className="flex items-center justify-center">
          <Dot size={40} className="text-brand-green" />
          <span className="text-xs font-bold md:text-sm">
            {t('common.present')}
          </span>
        </div>
        <div className="flex items-center justify-center">
          <Dot size={40} className="text-brand-teal" />
          <span className="text-xs font-bold md:text-sm">
            {t('common.excused')}
          </span>
        </div>
        <div className="flex items-center justify-center">
          <Dot size={40} className="text-brand-red" />
          <span className="text-xs font-bold md:text-sm">
            {t('common.unexcused')}
          </span>
        </div>
        <div className="flex items-center justify-center">
          <Dot size={40} className="text-brand-orange" />
          <span className="text-xs font-bold md:text-sm">
            {t('common.late')}
          </span>
        </div>
      </div>
      <CalendarStyled
        mode="single"
        disabled={{ dayOfWeek: [0, 6] }}
        onMonthChange={setDate}
        locale={getDateLocale(currentLanguage)}
        components={{
          DayContent: (props) => (
            <CustomDayContent
              {...props}
              events={{
                present: ReportGrouped?.[AttendanceCode.PRESENT],
                excused: ReportGrouped?.[AttendanceCode.EXCUSED_ABSENCE],
                unexcused: ReportGrouped?.[AttendanceCode.UNEXCUSED_ABSENCE],
                late: ReportGrouped?.[AttendanceCode.LATE],
              }}
            />
          ), // Replace the DayContent component
        }}
      />
    </div>
  )
}
