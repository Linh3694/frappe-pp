import { useFrappeGetCall } from 'frappe-react-sdk'

import { FRAPPE_APIS } from '../api.config'
import { useEffect } from 'react'
import { CourseClassExtend } from '@/types/Extends/CourseClass'
type Params = {
  classId?: string | null
  isAttendance?: boolean
}
export const useGetCourseClassById = (params: Params, skip?: boolean) => {
  const { data, error, isLoading, isValidating, mutate } = useFrappeGetCall<{
    message: CourseClassExtend
  }>(
    FRAPPE_APIS.GET_COURSE_CLASS_BY_ID.METHOD_STRING,
    {
      course_class_id: params.classId,
      attendance_check: params.isAttendance,
    },
    !skip
      ? `${FRAPPE_APIS.GET_COURSE_CLASS_BY_ID.SWR_KEY}_${params.classId}`
      : null,
  )

  useEffect(() => {
    (data || error) && mutate()
  }, [JSON.stringify(params)])

  const courseClass = data?.message

  return { error, courseClass, isLoading, isValidating }
}
