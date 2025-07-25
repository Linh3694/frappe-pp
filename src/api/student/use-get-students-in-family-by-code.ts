import { useFrappeGetCall } from 'frappe-react-sdk'

import { FRAPPE_APIS } from '../api.config'
import { SISCourseClass } from '@/types/SIS/SISCourseClass'
import { useEffect } from 'react'
import { SISSchoolClass } from '@/types/SIS/SISSchoolClass'
import { SchoolClassExtend } from '@/types/Extends/SchoolClass'
import { StudentsInFamily } from '@/types/Extends/Family'
import { ResponseAPI } from '@/types/Extends/Respone'

export const useGetStudentsInFamilyByCode = (studentCode?: string | null, skip?: boolean) => {
  const { data, error, isLoading, isValidating, mutate } = useFrappeGetCall<{
    message: ResponseAPI<StudentsInFamily>
  }>(
    FRAPPE_APIS.GET_STUDENTS_IN_FAMILY_BY_CODE.METHOD_STRING,
    {
      std_code: studentCode,
    },
    !skip
    ? `${FRAPPE_APIS.GET_STUDENTS_IN_FAMILY_BY_CODE.SWR_KEY}_${studentCode}`
    : null,
  )

  useEffect(() => {
    ;(data || error) && mutate()
  }, [studentCode])

  const students = data?.message.data

  return { error, students, isLoading, isValidating }
}
