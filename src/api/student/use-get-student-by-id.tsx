import { useFrappeGetCall } from 'frappe-react-sdk'

import { FRAPPE_APIS } from '../api.config'
import { SISCourseClass } from '@/types/SIS/SISCourseClass'
import { useEffect } from 'react'
import { SISSchoolClass } from '@/types/SIS/SISSchoolClass'
import { SchoolClassExtend } from '@/types/Extends/SchoolClass'
import { ResponseAPI } from '@/types/Extends/Respone'
import { StudentExtend } from '@/types/Extends/Student'

export const useGetStudentById = (personId?: string | null, skip?: boolean) => {
  const { data, error, isLoading, isValidating, mutate } = useFrappeGetCall<{
    message: ResponseAPI<StudentExtend>
  }>(
    FRAPPE_APIS.GET_STUDENT_BY_ID.METHOD_STRING,
    {
        person_id: personId,
    },
    !skip
    ? `${FRAPPE_APIS.GET_STUDENT_BY_ID.SWR_KEY}_${personId}`
    : null,
  )

  useEffect(() => {
    ;(data || error) && mutate()
  }, [personId])

  const student = data?.message.data

  return { error, student, isLoading, isValidating }
}
