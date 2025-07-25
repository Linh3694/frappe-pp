import { useFrappeGetCall } from 'frappe-react-sdk'

import { FRAPPE_APIS } from '../api.config'
import { SISClassFeed } from '@/types/SIS/SISClassFeed'
import { FrappeMeta } from '@/types/Extends/FrappeMeta'
import { useEffect } from 'react'
import { Period } from '@/types/Extends/Timetable'

type Params = {
  personId?: string
  startDate?: string
}

export const useGetTimetable = (params: Params, skip?: boolean) => {
  // if (skip)
  //   return {
  //     error: undefined,
  //     timetable: undefined,
  //     isLoading: false,
  //     isValidating: false,
  //   }
  const { data, error, isLoading, isValidating, mutate } = useFrappeGetCall<{
    message: {
      periods: Period[]
      date_range: string[]
    }
  }>(
    FRAPPE_APIS.GET_TIMETABLE.METHOD_STRING,
    { person_id: params.personId, type: 'admin', start_date: params.startDate },
    !skip ? `${FRAPPE_APIS.GET_TIMETABLE.SWR_KEY}` : null,
  )

  useEffect(() => {
    (data || error) && mutate()
  }, [JSON.stringify(params)])

  const timetable = data?.message

  return { error, timetable, isLoading, isValidating }
}
