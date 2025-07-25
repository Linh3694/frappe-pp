import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import React, { HTMLAttributes, useContext, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Button } from '@atoms/button'
import {
  DatesSetArg,
  DayHeaderContentArg,
  EventContentArg,
} from '@fullcalendar/core'
import allLocales from '@fullcalendar/core/locales-all'
import { differenceInMinutes, format } from 'date-fns'
import { useGetTimetable } from '@/api/timetable/use-get-timetable'
import { ChildrenContext } from '@/lib/student/children-provider'
import { cn } from '@/core/utils/shadcn-utils'
import {
  CourseClassSpecialPalatte,
  coursePalatte,
} from '@/core/constant/palette'
import { getDateLocale, stringHashToNumber } from '@/lib/utils/common'
import { darken, lighten, rgba } from 'polished'
import { useAuthContext } from '@/lib/auth/auth-provider'
import { useTheme } from '@/lib/shadcn/theme-provider'
import { useLocales } from '@/core/hooks'

const FullCalendarStyled = styled.div`
  .fc {
    &.fc-theme-standard .fc-scrollgrid,
    &.fc-theme-standard th,
    &.fc-theme-standard td {
      border-color: hsl(var(--border));
    }
    .fc-toolbar-title {
      font-size: 1.25rem;
      font-weight: bold;
      color: hsl(var(--brand-secondary));
    }
    .fc-v-event {
      border-color: transparent;
    }
    .fc-button-primary {
      text-transform: capitalize;
      background-color: hsl(var(--brand-teal));
      border-color: hsl(var(--brand-teal));
      &:disabled {
        background-color: hsl(var(--card-foreground));
        border-color: hsl(var(--border));
        color: #888;
      }
    }
    .fc-view-harness {
      background-color: hsl(var(--card));
    }
    .fc-col-header-cell-cushion {
      padding: 0.5rem;
      color: #6b7280;
    }
    .fc-timegrid-slot-label-cushion {
      padding: 0 1.25rem;
      color: #6b7280;
      font-size: 0.85rem;
    }
    .fc-timegrid-slot-label {
      border: none;
      vertical-align: top;
    }
    .fc-timegrid-slot-lane {
      height: 2.5rem;
    }
    .fc-timegrid-slot-minor {
      border-top: none;
    }
    .fc-event {
      overflow: hidden;
    }
    .fc-timegrid-col.fc-day-today {
      background-color: hsl(var(--brand-orange) / 10%);
    }
    .fc-timegrid-event-harness-inset {
      inset-inline-start: 0px !important;
    }
    .fc-timegrid-event-harness-inset .fc-timegrid-event,
    .fc-timegrid-event.fc-event-mirror,
    .fc-timegrid-more-link {
      box-shadow: none;
    }
  }
`

type Props = HTMLAttributes<HTMLDivElement> & {}

export type EventType = {
  subject: string
  teacher: string
  start: number
  end: number
  type: string
  backgroundColor: string
  textColor: string
}

export const StudentTimetableFullCalendar = ({ className }: Props) => {
  const { currentLanguage } = useLocales()
  const [startDate, setStartDate] = useState<Date>(new Date())
  const { theme } = useTheme()
  const { current } = useContext(ChildrenContext)
  const { timetable } = useGetTimetable(
    {
      personId: current?.person_id,
      startDate: format(startDate, 'yyyy-MM-dd'),
    },
    !current?.person_id,
  )

  const events =
    timetable?.periods?.map<EventType>((timeslot) => ({
      subject: timeslot.courseTitle,
      teacher: 'unknown',
      start: Date.parse(`${timeslot.date} ${timeslot.timeStart}`),
      end: Date.parse(`${timeslot.date} ${timeslot.timeEnd}`),
      type: timeslot.ttColumnRowType,
      backgroundColor: darken(
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
    })) || []

  // console.log(events)

  const onChangeDates = (arg: DatesSetArg) => {
    setStartDate(arg.start)
  }

  return (
    <div className={cn(className)}>
      <FullCalendarStyled>
        {useMemo(
          () => (
            <FullCalendar
              allDaySlot={false}
              dayHeaderContent={(header) =>
                renderDayHeader({ header, currentLanguage })
              }
              weekends={false}
              contentHeight="auto"
              slotMinTime="07:30:00"
              slotMaxTime="16:30:00"
              plugins={[timeGridPlugin]}
              initialView="timeGridWeek"
              events={events}
              eventContent={renderEventContent}
              // nowIndicator={true}
              // now={new Date()}
              locales={allLocales}
              locale={getDateLocale(currentLanguage)}
              datesSet={onChangeDates}
              slotLabelFormat={{
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                // omitZeroMinute: true,
                meridiem: 'short',
              }}
            />
          ),
          [JSON.stringify(events), currentLanguage],
        )}
      </FullCalendarStyled>
    </div>
  )
}

export const TeacherTimetableFullCalendar = ({ className }: Props) => {
  const { currentLanguage } = useLocales()
  const [startDate, setStartDate] = useState<Date>(new Date())
  const { theme } = useTheme()
  const { userInfo } = useAuthContext()
  const { timetable } = useGetTimetable(
    {
      personId: userInfo?.name,
      startDate: format(startDate, 'yyyy-MM-dd'),
    },
    !userInfo?.name,
  )

  const events =
    timetable?.periods?.map<EventType>((timeslot) => ({
      subject: timeslot.courseClassTitle,
      teacher: 'unknown',
      start: Date.parse(`${timeslot.date} ${timeslot.timeStart}`),
      end: Date.parse(`${timeslot.date} ${timeslot.timeEnd}`),
      type: timeslot.ttColumnRowType,
      backgroundColor: darken(
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
    })) || []

  // console.log(events)

  const onChangeDates = (arg: DatesSetArg) => {
    setStartDate(arg.start)
  }

  return (
    <div className={cn(className)}>
      <FullCalendarStyled>
        {useMemo(
          () => (
            <FullCalendar
              allDaySlot={false}
              dayHeaderContent={(header) =>
                renderDayHeader({ header, currentLanguage })
              }
              weekends={false}
              contentHeight="auto"
              slotMinTime="07:30:00"
              slotMaxTime="17:00:00"
              plugins={[timeGridPlugin]}
              initialView="timeGridWeek"
              events={events}
              eventContent={renderEventContent}
              // nowIndicator={true}
              // now={new Date()}
              locales={allLocales}
              locale={getDateLocale(currentLanguage)}
              datesSet={onChangeDates}
              slotLabelFormat={{
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                // omitZeroMinute: true,
                meridiem: 'short',
              }}
            />
          ),
          [JSON.stringify(events), currentLanguage],
        )}
      </FullCalendarStyled>
    </div>
  )
}

const renderDayHeader = ({
  header,
  currentLanguage,
}: {
  header: DayHeaderContentArg
  currentLanguage: string
}) => {
  return (
    <div className={cn('text-md flex h-full flex-col py-1 pl-1')}>
      <div className={'flex gap-2'}>
        <div className={'font-mulish font-semibold text-gray-500'}>
          {format(header.date, 'EEE', {
            locale: getDateLocale(currentLanguage),
          })}
        </div>
        <div
          className={cn(
            'font-semibold text-brand-secondary',
            header.isToday && 'text-brand-orange',
          )}
        >
          {format(header.date, 'dd')}
        </div>
      </div>
      {/* <div className="font-normal">{format(header.date, "MMM dd")}</div> */}
    </div>
  )
}

const renderEventContent = (eventInfo: EventContentArg) => {
  return (
    <div
      className={cn(
        'flex h-full w-full animate-fade-in justify-between gap-0 px-2 py-0 text-sm',
        {
          'py-2':
            differenceInMinutes(
              new Date(eventInfo.event.end || ''),
              new Date(eventInfo.event.start || ''),
            ) > 30,
        },
      )}
      style={{
        borderLeft: `5px solid ${darken(0.1, eventInfo.event.backgroundColor)}`,
      }}
    >
      {/* <div className="w-10 h-10 bg-brand-secondary/20" /> */}
      <div>
        <div
          className={cn('line-clamp-1 text-xs font-semibold leading-4', {
            'text-[10px] leading-[10px]':
              differenceInMinutes(
                new Date(eventInfo.event.end || ''),
                new Date(eventInfo.event.start || ''),
              ) < 15,
          })}
          style={{ color: eventInfo.event.textColor }}
          title={eventInfo.event.extendedProps.subject}
        >
          {eventInfo.event.extendedProps.subject}
        </div>
        {/* <div className="line-clamp-1 text-sm text-primary">
          {eventInfo.event.extendedProps.teacher}
        </div> */}
      </div>
      {eventInfo.event.start && (
        <div
          className={cn(
            'basis-[90px] text-right text-xs text-muted-foreground',
            {
              'text-[10px] leading-[10px]':
                differenceInMinutes(
                  new Date(eventInfo.event.end || ''),
                  new Date(eventInfo.event.start || ''),
                ) < 15,
            },
          )}
          style={{ color: rgba(eventInfo.event.textColor, 0.7) }}
        >
          {format(eventInfo.event.start, 'HH:mm')}
          {eventInfo.event.end ? (
            <span className={cn('hidden lg:inline')}>
              - {format(eventInfo.event.end, 'HH:mm')}
            </span>
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  )
}
