import { SISFamilyChild } from '../SIS/SISFamilyChild'
import { SISFamilyGuardian } from '../SIS/SISFamilyGuardian'
import { SISPerson } from '../SIS/SISPerson'
import { SISSchoolClass } from '../SIS/SISSchoolClass'
import { SISSchoolYear } from '../SIS/SISSchoolYear'

export type StudentExtend = {
  person: SISPerson & {
    wellspring_student_code: string
  }
  class: SISSchoolClass
  family_members: {
    person: string
    full_name: string
    avatar: string
    relationship_with_student: string
  }[]
}
