import { SISAttendanceLogPerson } from '../SIS/SISAttendanceLogPerson'
import { SISCourseClass } from '../SIS/SISCourseClass'
import { SISPerson } from '../SIS/SISPerson'
import { SISSchoolClass } from '../SIS/SISSchoolClass'
import { SISTimetableDayRowClass } from '../SIS/SISTimetableDayRowClass'
import { ParticipantExtend } from './Person'

export type CourseClassExtend = Omit<
  SISCourseClass,
  'participants' | 'timetable_day_row_class'
> & {
  participants: ParticipantExtend[]
  timetable_day_row_class: {
    timetable_day_row_class: string
    date: string
    timetable_day: string
    timetable_day_title: string
    timetable_column_row: string
    timetable_column_row_title: string
    time_start: string
    time_end: string
  }[]
}
