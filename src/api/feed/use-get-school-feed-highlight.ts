import { useFrappeGetCall } from 'frappe-react-sdk'

import { FRAPPE_APIS } from '../api.config'
import { FrappeMeta } from '@/types/Extends/FrappeMeta'
import { SISSchoolFeed } from '@/types/SIS/SISSchoolFeed'
import { useEffect } from 'react'
import { SISClassFeed } from '@/types/SIS/SISClassFeed'

export const useGetSchoolFeedHighlight = (
  personId: string,
  limit?: number,
  page?: number,
  tag?: string,
) => {
  const { data, error, isLoading, isValidating, mutate } = useFrappeGetCall<{
    message: {
      total_count: number
      page: number
      limit: number
      docs: (SISSchoolFeed & FrappeMeta)[]
    }
  }>(
    FRAPPE_APIS.GET_ALL_SCHOOL_FEED.METHOD_STRING,
    { person_id: personId, limit, page },
    FRAPPE_APIS.GET_ALL_SCHOOL_FEED_HIGHLIGHT.SWR_KEY,
  )
  useEffect(() => {
    data && mutate()
  }, [JSON.stringify({ personId, limit, page })])

  const feeds: (SISSchoolFeed & FrappeMeta)[]  =
    data?.message.docs.map((item) => ({
      ...item,
      likedBy: JSON.parse(item._liked_by),
    })) || []

  const currentPage = data?.message.page || 0
  const totalCount = data?.message.total_count || 0
  const totalPage = Math.floor((data?.message.total_count || 0) / 2)

  return {
    error,
    feeds,
    currentPage,
    totalCount,
    totalPage,
    isLoading,
    isValidating,
  }
}
