import { useFrappeGetCall } from 'frappe-react-sdk'

import { FRAPPE_APIS } from '../api.config'
import { SISClassFeed } from '@/types/SIS/SISClassFeed'
import { FrappeMeta } from '@/types/Extends/FrappeMeta'
import { useEffect } from 'react'
import { ClassFeedExtend } from '@/types/Extends/Feed'

export const useGetClassFeedById = (classFeedId: string) => {
  const { data, error, isLoading, isValidating, mutate } = useFrappeGetCall<{
    message: ClassFeedExtend
  }>(
    FRAPPE_APIS.GET_CLASS_FEED_BY_ID.METHOD_STRING,
    { class_feed_id: classFeedId },
    `${FRAPPE_APIS.GET_CLASS_FEED_BY_ID.SWR_KEY}_${classFeedId}`,
  )

  useEffect(() => {
    data && mutate()
  }, [classFeedId])

  const feed = data?.message
  if (feed && feed._liked_by) {
    feed.likedBy = JSON.parse(feed._liked_by)
  }

  return { error, feed, isLoading, isValidating }
}
