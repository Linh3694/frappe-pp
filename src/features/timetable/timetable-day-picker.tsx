import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import clsx from 'clsx'
import React, { HTMLAttributes, useContext, useState } from 'react'
import styled from 'styled-components'
import { Button } from '@atoms/button'
import { DayHeaderContentArg, EventContentArg } from '@fullcalendar/core'
import { format, isSameDay } from 'date-fns'
import WeekdayPicker from '@atoms/weekday-picker'
import { Tabs, TabsContent } from '@atoms/tabs'
import { timetableDesktop } from '@/mock-data/timetable.json'
import moment from 'moment'
import { WeeklyPicker } from '@molecules/weekly-picker'
import { ChildrenContext } from '@/lib/student/children-provider'
import { useGetTimetable } from '@/api/timetable/use-get-timetable'
import { cn } from '@/core/utils/shadcn-utils'
import { stringHashToNumber } from '@/lib/utils/common'
import {
  CourseClassSpecialPalatte,
  coursePalatte,
} from '@/core/constant/palette'
import { darken, lighten, rgba } from 'polished'
import { useAuthContext } from '@/lib/auth/auth-provider'
import { useTheme } from '@/lib/shadcn/theme-provider'
import { useLocales } from '@/core/hooks'

type Props = HTMLAttributes<HTMLDivElement> & {}

export type EventType = {
  subject: string
  teacher: string
  start: number
  end: number
  backgroundColor: string
  textColor: string
}

export const StudentTimetableDayPicker = ({ className }: Props) => {
  const {t} = useLocales()
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const { theme } = useTheme()
  const { current } = useContext(ChildrenContext)
  const { timetable } = useGetTimetable(
    {
      personId: current?.person_id,
      startDate: format(startDate, 'yyyy-MM-dd'),
    },
    !current?.person_id,
  )

  const events = timetable?.periods?.reduce<TinmeDayType[]>(
    (filter, timeslot) => {
      if (isSameDay(timeslot.date, currentDate)) {
        filter.push({
          title: timeslot.courseTitle,
          start: Date.parse(`${timeslot.date} ${timeslot.timeStart}`),
          end: Date.parse(`${timeslot.date} ${timeslot.timeEnd}`),
          type: timeslot.ttColumnRowType,
          bgColor: darken(
            theme === 'dark' ? 0.7 : 0,
            timeslot.ttColumnRowType === 'Lesson'
              ? (coursePalatte[
                  stringHashToNumber(timeslot.courseID, coursePalatte.length)
                ].bg ?? '#000000')
              : CourseClassSpecialPalatte[timeslot.ttColumnRowType].bg,
          ),
          textColor: lighten(
            theme === 'dark' ? 0.3 : 0,
            timeslot.ttColumnRowType === 'Lesson'
              ? (coursePalatte[
                  stringHashToNumber(timeslot.courseID, coursePalatte.length)
                ].text ?? '#000000')
              : CourseClassSpecialPalatte[timeslot.ttColumnRowType].text,
          ),
        })
      }
      return filter
    },
    [],
  )

  const handleChangeDate = (date: Date) => {
    setStartDate(date)
    setCurrentDate(date)
  }

  const handleChangeDay = (date: Date) => {
    setCurrentDate(date)
  }

  return (
    <>
      <WeeklyPicker
        className="mb-5"
        value={startDate}
        onChangeDate={handleChangeDate}
        onChangeDay={handleChangeDay}
        displayWeekend={false}
      />
      {events && events?.length > 0 && (
        <div className={cn('flex animate-fade-in flex-col gap-2', className)}>
          {events?.map((event, index) => (
            <TimetableDay
              key={index}
              {...event}
              className={cn('border-0', {
                'bg-[#E5E7EB] text-[#6B7280]': event.type === 'Break',
                'bg-[#f1e3d5] text-[#b86a1c]': event.type === 'Service',
              })}
            />
          ))}
        </div>
      )}
      {events && events?.length === 0 && (
        <div className="animate-fade-in border p-4 text-center">
          <p>{t('components.notification.no_period.description')}</p>
        </div>
      )}
    </>
  )
}

export const TeacherTimetableDayPicker = ({ className }: Props) => {
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const { theme } = useTheme()
  const { userInfo } = useAuthContext()
  const { timetable } = useGetTimetable(
    {
      personId: userInfo?.name,
      startDate: format(startDate, 'yyyy-MM-dd'),
    },
    !userInfo?.name,
  )
  
  const events = timetable?.periods?.reduce<TinmeDayType[]>(
    (filter, timeslot) => {
      if (isSameDay(timeslot.date, currentDate)) {
        filter.push({
          title: timeslot.courseClassTitle,
          start: Date.parse(`${timeslot.date} ${timeslot.timeStart}`),
          end: Date.parse(`${timeslot.date} ${timeslot.timeEnd}`),
          type: timeslot.ttColumnRowType,
          bgColor: darken(
            theme === 'dark' ? 0.7 : 0,
            timeslot.ttColumnRowType === 'Lesson'
              ? (coursePalatte[
                  stringHashToNumber(timeslot.courseClassID, coursePalatte.length)
                ].bg ?? '#000000')
              : CourseClassSpecialPalatte[timeslot.ttColumnRowType].bg,
          ),
          textColor: lighten(
            theme === 'dark' ? 0.3 : 0,
            timeslot.ttColumnRowType === 'Lesson'
              ? (coursePalatte[
                  stringHashToNumber(timeslot.courseClassID, coursePalatte.length)
                ].text ?? '#000000')
              : CourseClassSpecialPalatte[timeslot.ttColumnRowType].text,
          ),
        })
      }
      return filter
    },
    [],
  )

  const handleChangeDate = (date: Date) => {
    setStartDate(date)
    setCurrentDate(date)
  }

  const handleChangeDay = (date: Date) => {
    setCurrentDate(date)
  }

  return (
    <>
      <WeeklyPicker
        className="mb-5"
        value={startDate}
        onChangeDate={handleChangeDate}
        onChangeDay={handleChangeDay}
        displayWeekend={false}
      />
      {events && events?.length > 0 && (
        <div className={cn('flex animate-fade-in flex-col gap-2', className)}>
          {events?.map((event, index) => (
            <TimetableDay
              key={index}
              {...event}
              className={cn('border-0', {
                'bg-[#E5E7EB] text-[#6B7280]': event.type === 'Break',
                'bg-[#f1e3d5] text-[#b86a1c]': event.type === 'Service',
              })}
            />
          ))}
        </div>
      )}
      {events && events?.length === 0 && (
        <div className="animate-fade-in border p-4 text-center">
          <p>There are no study schedules found for this date</p>
        </div>
      )}
    </>
  )
}

type TimetableDayProps = HTMLAttributes<HTMLDivElement> & TinmeDayType & {}

export type TinmeDayType = {
  title: string
  subtitle?: string
  start: number
  end: number
  type?: string
  bgColor?: string
  textColor?: string
}

export default function TimetableDay({
  className,
  title,
  subtitle,
  start,
  end,
  bgColor,
  textColor,
}: TimetableDayProps) {
  return (
    <div
      className={cn('rounded-xl border bg-background p-4 shadow-sm', className)}
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="basis-1/3 text-sm font-semibold text-muted-foreground"
        style={{ color: textColor && rgba(textColor, 0.7) }}
      >
        {moment(start).format('HH:mm A')} - {moment(end).format('HH:mm A')}
      </div>
      <div className="flex items-center">
        <div
          className="flex-1 text-lg text-brand-teal "
          style={{ color: textColor }}
        >
          {title}
        </div>
        <div
          className="py-2 text-sm text-gray-500"
          style={{ color: textColor && rgba(textColor, 0.8) }}
        >
          {subtitle}
        </div>
      </div>
    </div>
  )
}
