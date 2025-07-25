import { useFrappeGetCall } from 'frappe-react-sdk'

import { FRAPPE_APIS } from '../api.config'
import { SISCourseClass } from '@/types/SIS/SISCourseClass'
import { useEffect } from 'react'
import { SISAttendanceLogSchoolClass } from '@/types/SIS/SISAttendanceLogSchoolClass'
import { AttendanceSchoolClassRecord } from '@/types/Extends/Attendance'

type Params = {
  classId?: string
  date?: string
}

export const useGetAttendanceSchoolClassRecords = (
  params?: Params,
  skip?: boolean,
) => {
  const { data, error, isLoading, isValidating, mutate } = useFrappeGetCall<{
    message: AttendanceSchoolClassRecord[]
  }>(
    FRAPPE_APIS.GET_ATTENDANCE_SCHOOL_CLASS_RECORDS.METHOD_STRING,
    {
      school_class_id: params?.classId,
      date: params?.date,
    },
    !skip ? `${FRAPPE_APIS.GET_ATTENDANCE_SCHOOL_CLASS_RECORDS.SWR_KEY}` : null,
  )

  useEffect(() => {
    ;(data || error) && mutate?.()
  }, [params?.classId, params?.date])

  const records = data?.message

  return { error, records, isLoading, isValidating }
}
