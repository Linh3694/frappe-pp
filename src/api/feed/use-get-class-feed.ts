import { useFrappeGetCall } from 'frappe-react-sdk'

import { FRAPPE_APIS } from '../api.config'
import { SISClassFeed } from '@/types/SIS/SISClassFeed'
import { FrappeMeta } from '@/types/Extends/FrappeMeta'
import { useEffect } from 'react'
import { ClassFeedExtend } from '@/types/Extends/Feed'

type Params = {
  personId: string
  limit?: number
  page?: number
  filters?: string
}

export const useGetClassFeed = (params?: Params, skip?: boolean) => {
  const { data, error, isLoading, isValidating, mutate } = useFrappeGetCall<{
    message: {
      total_count: number
      page: number
      limit: number
      docs: ClassFeedExtend[]
    }
  }>(
    FRAPPE_APIS.GET_ALL_CLASS_FEED.METHOD_STRING,
    {
      person_id: params?.personId,
      limit: params?.limit,
      page: params?.page,
      filters: params?.filters,
    },
    !skip ? `${FRAPPE_APIS.GET_ALL_CLASS_FEED.SWR_KEY}_${JSON.stringify(params)}_${(new Date()).getHours()+(new Date()).getSeconds()}` : null,
  )

  useEffect(() => {
    mutate()
  }, [JSON.stringify(params)])

  const feeds =
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
