import { SISAttendanceLogPerson } from '../SIS/SISAttendanceLogPerson'
import { SISPerson } from '../SIS/SISPerson'
import { SISSchoolClass } from '../SIS/SISSchoolClass'
import { ParticipantExtend } from './Person'

export type SchoolClassExtend = Omit<SISSchoolClass, 'participants'> & {
  participants: ParticipantExtend[]
}
