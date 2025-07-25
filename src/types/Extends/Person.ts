import { SISAttendanceLogPerson } from '../SIS/SISAttendanceLogPerson'

export type ParticipantExtend = {
  full_name: string
  name: string
  person: string
  parent: string
  avatar: string
  date_of_birth: string
  school_class_title: string
  school_class_short_title: string
  role: 'Student' | 'Teacher' | 'Assistant' | 'Parent'
}
