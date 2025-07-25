import { useFrappeGetCall } from 'frappe-react-sdk'

import { FRAPPE_APIS } from '../api.config'
import { SISCourseClass } from '@/types/SIS/SISCourseClass'
import { useEffect } from 'react'
import { SISAttendanceLogSchoolClass } from '@/types/SIS/SISAttendanceLogSchoolClass'
import { AttendanceSchoolClassRecord, AttendanceStudentCalendar, AttendanceStudentSummary } from '@/types/Extends/Attendance'

type Params = {
  personId?: string
  firstDay?: string
  lastDay?: string
}

export const useGetAttendanceStudentCalendar = (
  params?: Params,
  skip?: boolean,
) => {
  const { data, error, isLoading, isValidating, mutate } = useFrappeGetCall<{
    message: AttendanceStudentCalendar
  }>(
    FRAPPE_APIS.GET_ATTENDANCE_STUDENT_CALENDAR.METHOD_STRING,
    {
      person_id: params?.personId,
      first_day: params?.firstDay,
      last_day: params?.lastDay,
    },
    !skip?`${FRAPPE_APIS.GET_ATTENDANCE_STUDENT_CALENDAR.SWR_KEY}`:null,
  )

  useEffect(() => {
    (data || error) && mutate?.()
  }, [JSON.stringify(params)])

  const report = data?.message

  return { error, report, isLoading, isValidating }
}
