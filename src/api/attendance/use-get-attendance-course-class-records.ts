import { useFrappeGetCall } from 'frappe-react-sdk'

import { FRAPPE_APIS } from '../api.config'
import { SISCourseClass } from '@/types/SIS/SISCourseClass'
import { AttendanceCourseClassRecord } from '@/types/Extends/Attendance'
import { useEffect } from 'react'

type Params = {
  classId?: string
  date?: string
}

export const useGetAttendanceCourseClassRecords = (
  params?: Params,
  skip?: boolean,
) => {
  const { data, error, isLoading, isValidating, mutate } = useFrappeGetCall<{
    message: AttendanceCourseClassRecord[]
  }>(
    FRAPPE_APIS.GET_ATTENDANCE_COURSE_CLASS_RECORDS.METHOD_STRING,
    {
      course_class_id: params?.classId,
      date: params?.date,
    },
    !skip ? `${FRAPPE_APIS.GET_ATTENDANCE_COURSE_CLASS_RECORDS.SWR_KEY}` : null,
  )

  useEffect(() => {
    ;(data || error) && mutate?.()
  }, [params?.classId, params?.date])

  const records = data?.message

  return { error, records, isLoading, isValidating }
}
