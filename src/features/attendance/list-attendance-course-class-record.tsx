import CardList from '@molecules/card-list'
import RequestListItem from '@molecules/request-list-item'
import clsx from 'clsx'
import React, {
  HTMLAttributes,
  memo,
  PropsWithChildren,
  useContext,
} from 'react'
import { requests } from '@/mock-data/request.json'
import { Plus, Rows, WarningCircle } from 'phosphor-react'
import { cn } from '@/core/utils/shadcn-utils'
import { format } from 'date-fns'
import { useLocales } from '@/core/hooks'
import { getDateLocale } from '@/lib/utils/common'
import { Link } from 'react-router-dom'
import { AuthContext } from '@/lib/auth/auth-provider'
import { useGetAttendanceSchoolClassRecords } from '@/api/attendance/use-get-attendance-school-class-records'
import Announcement from '@molecules/announcement'
import { AttendanceFilterValues } from './attendance-filter'
import {
  AttendanceCourseClassRecord,
  AttendanceSchoolClassRecord,
} from '@/types/Extends/Attendance'
import { Skeleton } from '@atoms/skeleton'
import { useGetAttendanceCourseClassRecords } from '@/api/attendance/use-get-attendance-course-class-records'
import { NoResult } from '@features/empty/NoResult'

type Props = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    filter?: AttendanceFilterValues
  }

function ListAttendanceCourseClassRecord({ className, filter }: Props) {
  const { records } = useGetAttendanceCourseClassRecords(
    {
      classId: filter?.classId,
      date: filter?.date && format(filter?.date, 'yyyy-MM-dd'),
    },
    !filter?.classId,
  )

  if (!records) {
    return (
      <>
        {Array.from(Array(3).keys()).map((idx) => (
          <Skeleton key={idx} className="h-[100px] w-full" />
        ))}
      </>
    )
  }
  if (records?.length === 0) return <NoResult />
  return (
    <div className="flex flex-col gap-5">
      {records?.map((record) => (
        // <Link
        //   key={record.name}
        //   to={`/${prefixRoute}/attendance/classes/new-record`}
        // >
        <RecordItem key={record.name} data={record} />
        // </Link>
      ))}
    </div>
  )
}

export default memo(ListAttendanceCourseClassRecord)

type RecordItemProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    data: AttendanceCourseClassRecord
  }

const RecordItem = ({ className, data }: RecordItemProps) => {
  const { t } = useLocales()
  const { currentLanguage } = useLocales()

  return (
    <div
      className={cn(
        'cursor-pointer rounded-lg border bg-background p-3 shadow-sm sm:p-6',
        className,
      )}
    >
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-1 sm:gap-2">
          <div className="flex flex-col justify-between gap-2 sm:gap-3">
            <div className="sm:space-y-1">
              <div className="space-x-4">
                <span className="text-xl text-brand-secondary sm:text-2xl lg:text-3xl">
                  {`${data?.course_class.title}`}
                </span>
                <span className="text-xl text-slate-400 sm:text-2xl lg:text-3xl">
                  {format(data?.date || new Date(), 'PP', {
                    locale: getDateLocale(currentLanguage),
                  })}
                </span>
              </div>
              <div className="sm:text-md space-x-2 text-sm text-muted-foreground/70 lg:text-lg">
                <span>{`${t('common.classroom_c', { class: data?.course_class.title })} - ${t('common.n_students', { number: data?.student_list.length })}`}</span>
              </div>
            </div>
            <i className="text-xs opacity-50 sm:text-sm">
              {t('common.submitted_at_d_by_n', {
                date:
                  data?.creation &&
                  format(data?.creation, 'PPp', {
                    locale: getDateLocale(currentLanguage),
                  }),
                name: data.person_taker.full_name,
              })}
            </i>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 lg:gap-x-10 xl:px-40">
          {/* <div className="space-y-1 text-center">
            <p className="text-2xl text-primary sm:text-3xl sm:font-bold">
              {data.student_list.length}
            </p>
            <p className="font-light">Total</p>
          </div> */}
          <div className="space-y-1 text-center">
            <p className="text-2xl text-brand-green sm:text-3xl sm:font-bold">
              {
                data.student_list.filter((s) => s.attendance_code === 'Present')
                  .length
              }
            </p>
            <p className="text-sm font-light">{t('common.present')}</p>
          </div>
          <div className="space-y-1 text-center">
            <p className="text-2xl text-brand-teal sm:text-3xl sm:font-bold">
              {
                data.student_list.filter(
                  (s) => s.attendance_code === 'Authorized Absent',
                ).length
              }
            </p>
            <p className="text-sm font-light">{t('common.excused')}</p>
          </div>
          <div className="space-y-1 text-center">
            <p className="text-2xl text-brand-red sm:text-3xl sm:font-bold">
              {
                data.student_list.filter(
                  (s) => s.attendance_code === 'Unauthorized Absent',
                ).length
              }
            </p>
            <p className="text-sm font-light">{t('common.unexcused')}</p>
          </div>
          <div className="space-y-1 text-center">
            <p className="text-2xl text-brand-orange sm:text-3xl sm:font-bold">
              {
                data.student_list.filter((s) => s.attendance_code === 'Late')
                  .length
              }
            </p>
            <p className="text-sm font-light">{t('common.late')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
