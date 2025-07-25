import { useFrappeGetCall } from 'frappe-react-sdk'

import { FRAPPE_APIS } from '../api.config'
import { SISClassFeed } from '@/types/SIS/SISClassFeed'
import { FrappeMeta } from '@/types/Extends/FrappeMeta'
import { useEffect } from 'react'
import { SISAcademicYearEvent } from '@/types/SIS/SISAcademicYearEvent'
import { format } from 'date-fns'

type Params = {
  limit?: number
  page?: number
}

export const useGetUpcomingEvents = (params?: Params) => {
  // console.log(tagtoogl);

  const { data, error, isLoading, isValidating, mutate } = useFrappeGetCall<{
    message: {
      total_count: number
      page: number
      limit: number
      docs: SISAcademicYearEvent[]
    }
  }>(
    FRAPPE_APIS.GET_UPCOMING_EVENTS.METHOD_STRING,
    {
      filters: JSON.stringify({
        start_date: ['>', format(new Date(), 'yyyy-MM-dd')],
      }),
      limit:params?.limit,
      page:params?.page,
    },
    FRAPPE_APIS.GET_UPCOMING_EVENTS.SWR_KEY,
  )

  useEffect(() => {
    data && mutate()
  }, [JSON.stringify(params)])

  const upcomingEvents = data?.message.docs || []

  const currentPage = data?.message.page || 0
  const totalCount = data?.message.total_count || 0
  const totalPage = Math.floor((data?.message.total_count || 0) / 2)

  return {
    error,
    upcomingEvents,
    currentPage,
    totalCount,
    totalPage,
    isLoading,
    isValidating,
  }
}
