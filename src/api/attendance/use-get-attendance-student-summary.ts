import { useFrappeGetCall } from 'frappe-react-sdk'

import { FRAPPE_APIS } from '../api.config'
import { SISCourseClass } from '@/types/SIS/SISCourseClass'
import { useEffect } from 'react'
import { SISAttendanceLogSchoolClass } from '@/types/SIS/SISAttendanceLogSchoolClass'
import {
  AttendanceSchoolClassRecord,
  AttendanceStudentSummary,
} from '@/types/Extends/Attendance'

type Params = {
  personId?: string
  firstDay?: string
  lastDay?: string
  schoolYearTermId?: string
}

export const useGetAttendanceStudentSummary = (
  params?: Params,
  skip?: boolean,
) => {
  const { data, error, isLoading, isValidating, mutate } = useFrappeGetCall<{
    message: AttendanceStudentSummary
  }>(
    FRAPPE_APIS.GET_ATTENDANCE_STUDENT_SUMMARY.METHOD_STRING,
    {
      person_id: params?.personId,
      first_day: params?.firstDay,
      last_day: params?.lastDay,
      school_year_term_id: params?.schoolYearTermId,
    },
    !skip ? `${FRAPPE_APIS.GET_ATTENDANCE_STUDENT_SUMMARY.SWR_KEY}` : null,
  )

  useEffect(() => {
    ;(data || error) && mutate?.()
  }, [JSON.stringify(params)])

  const summary = data?.message

  return { error, summary, isLoading, isValidating }
}
