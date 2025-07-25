import { SISPerson } from '../SIS/SISPerson'
import { SISSchoolClass } from '../SIS/SISSchoolClass'

export type StudentsInFamily = {
  family: string
  children: (SISPerson & {
    wellspring_student_code: string
    class: SISSchoolClass
  })[]
}
