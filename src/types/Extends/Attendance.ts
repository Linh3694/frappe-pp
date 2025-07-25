import { SISAttendanceLogCourseClass } from '../SIS/SISAttendanceLogCourseClass'
import { SISAttendanceLogPerson } from '../SIS/SISAttendanceLogPerson'
import { SISAttendanceLogSchoolClass } from '../SIS/SISAttendanceLogSchoolClass'

export type AttendanceSchoolClassRecord = Omit<
  SISAttendanceLogSchoolClass,
  'school_class' | 'person_taker' | 'student_list'
> & {
  school_class: {
    name: string
    title: string
    short_title: string
  }
  person_taker: {
    name: string
    full_name: string
  }
  student_list: Omit<SISAttendanceLogPerson,'attendance_code'> & {
    attendance_code: AttendanceCode
  }[]
}

export type AttendanceCourseClassRecord = SISAttendanceLogCourseClass & {
  course_class: {
    name: string
    title: string
    short_title: string
  }
  person_taker: {
    name: string
    full_name: string
  }
  student_list: (SISAttendanceLogPerson & {
    attendance_code: AttendanceCode
  })[]
}

export enum AttendanceCode {
  PRESENT = 'Present',
  EXCUSED_ABSENCE = 'Authorized Absent',
  UNEXCUSED_ABSENCE = 'Unauthorized Absent',
  LATE = 'Late',
}

export type AttendanceStudentSummary = {
  school_year_term: string
  first_day: string
  last_day: string
  person: string
  full_name: string
  present: string
  late: string
  authorized_absent: string
  unauthorized_absent: string
}

export type AttendanceStudentCalendar = {
  person: string
  full_name: string
  attendance_code: AttendanceCode
  reason: string
  date: string
  timestamp_taken: string
  school_class: string
  school_class_title: string
  school_class_short_title: string
}[]

export type AttendanceStudentTimeline = SISAttendanceLogPerson & {
  parent: {
    course_class?: {
      name: string
      title: string
      short_title: string
    },
    school_class?: {
      name: string
      title: string
      short_title: string
    }
  }
}
