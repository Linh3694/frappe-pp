import { useFrappeGetCall } from 'frappe-react-sdk'

import { FRAPPE_APIS } from '../api.config'
import { SISClassFeed } from '@/types/SIS/SISClassFeed'
import { FrappeMeta } from '@/types/Extends/FrappeMeta'
import { useEffect } from 'react'
import { Period } from '@/types/Extends/Timetable'
import { SISSchoolClass } from '@/types/SIS/SISSchoolClass'

export const useGetSchoolClassesByUser = () => {
  const { data, error, isLoading, isValidating, mutate } = useFrappeGetCall<{
    message: SISSchoolClass[]
  }>(
    FRAPPE_APIS.GET_SCHOOL_CLASSES_BY_USER.METHOD_STRING,
    {},
    `${FRAPPE_APIS.GET_SCHOOL_CLASSES_BY_USER.SWR_KEY}`,
  )

  return { error, data: data?.message , isLoading, isValidating }
}
