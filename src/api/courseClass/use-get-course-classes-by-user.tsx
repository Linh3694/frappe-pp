import { useFrappeGetCall } from 'frappe-react-sdk'

import { FRAPPE_APIS } from '../api.config'
import { SISCourseClass } from '@/types/SIS/SISCourseClass'

export const useGetCourseClassesByUser = () => {
  const { data, error, isLoading, isValidating, mutate } = useFrappeGetCall<{
    message: SISCourseClass[]
  }>(
    FRAPPE_APIS.GET_COURSE_CLASSES_BY_USER.METHOD_STRING,
    {},
    `${FRAPPE_APIS.GET_COURSE_CLASSES_BY_USER.SWR_KEY}`,
  )

  return { error, data: data?.message, isLoading, isValidating }
}
