import { useFrappeGetCall } from 'frappe-react-sdk'

import { FRAPPE_APIS } from '../api.config'
import { SISClassFeed } from '@/types/SIS/SISClassFeed'
import { FrappeMeta } from '@/types/Extends/FrappeMeta'
import { useEffect } from 'react'
import { SISSchoolYear } from '@/types/SIS/SISSchoolYear'

export const useGetCurrentSchoolYear = () => {
  // console.log(tagtoogl);

  const { data, error, isLoading, isValidating, mutate } = useFrappeGetCall<{
    message: SISSchoolYear
  }>(
    FRAPPE_APIS.GET_CURRENT_SCHOOL_YEAR.METHOD_STRING,
    { },
    FRAPPE_APIS.GET_CURRENT_SCHOOL_YEAR.SWR_KEY,
  )

  const schoolYear = data?.message

  return {
    error,
    schoolYear,
    isLoading,
    isValidating,
  }
}
