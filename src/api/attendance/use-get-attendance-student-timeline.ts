import { useFrappeGetCall } from 'frappe-react-sdk'

import { FRAPPE_APIS } from '../api.config'
import { SISCourseClass } from '@/types/SIS/SISCourseClass'
import { useEffect } from 'react'
import { SISAttendanceLogSchoolClass } from '@/types/SIS/SISAttendanceLogSchoolClass'
import { AttendanceSchoolClassRecord, AttendanceStudentSummary, AttendanceStudentTimeline } from '@/types/Extends/Attendance'

type Params = {
  personId?: string
  date?: string
}

export const useGetAttendanceStudentTimeline = (
  params?: Params,
  skip?: boolean,
) => {
  const { data, error, isLoading, isValidating, mutate } = useFrappeGetCall<{
    message: AttendanceStudentTimeline[]
  }>(
    FRAPPE_APIS.GET_ATTENDANCE_STUDENT_TIMELINE.METHOD_STRING,
    {
      person_id: params?.personId,
      date: params?.date,
    },
    !skip?`${FRAPPE_APIS.GET_ATTENDANCE_STUDENT_TIMELINE.SWR_KEY}`:null,
  )

  useEffect(() => {
    ;(data || error) && mutate?.()
  }, [JSON.stringify(params)])

  const timeline = data?.message

  return { error, timeline, isLoading, isValidating }
}
