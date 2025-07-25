import { useFrappePostCall, useSWRConfig } from 'frappe-react-sdk'

import { FRAPPE_APIS } from '../api.config'
import { SISClassFeed } from '@/types/SIS/SISClassFeed'
import { SISAttendanceLogSchoolClass } from '@/types/SIS/SISAttendanceLogSchoolClass'
import { AttendanceCode } from '@/types/Extends/Attendance'


export type AttendancePayload= {
  school_class: string
  student_list: {
    person:string
    attendance_code: AttendanceCode
    reason?: string
  }[]
}

export const useCreateAttendanceSchoolClass = () => {
  const { call: submitCreate } = useFrappePostCall<{
    message: SISAttendanceLogSchoolClass
  }>(FRAPPE_APIS.CREATE_ATTENDANCE_SCHOOL_CLASS.METHOD_STRING)

  const handleCreate = async (payload: AttendancePayload) => {
    try {
      const result = await submitCreate({
        doc: payload,
      })
      return Promise.resolve(result.message)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return { handleCreate }
}
