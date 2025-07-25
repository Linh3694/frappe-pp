import { useFrappeGetCall } from 'frappe-react-sdk'

import { FRAPPE_APIS } from '../api.config'
import { SISCourseClass } from '@/types/SIS/SISCourseClass'
import { useEffect } from 'react'
import { SISSchoolClass } from '@/types/SIS/SISSchoolClass'
import { SchoolClassExtend } from '@/types/Extends/SchoolClass'

export const useGetSchoolClassById = (classId?: string | null, skip?: boolean) => {
  const { data, error, isLoading, isValidating, mutate } = useFrappeGetCall<{
    message: SchoolClassExtend
  }>(
    FRAPPE_APIS.GET_SCHOOL_CLASS_BY_ID.METHOD_STRING,
    {
      school_class_id: classId,
    },
    !skip
    ? `${FRAPPE_APIS.GET_SCHOOL_CLASS_BY_ID.SWR_KEY}_${classId}`
    : null,
  )

  useEffect(() => {
    ;(data || error) && mutate()
  }, [classId])

  const schoolClass = data?.message

  return { error, schoolClass, isLoading, isValidating }
}
