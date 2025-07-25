import { useFrappeGetCall } from 'frappe-react-sdk'

import { FRAPPE_APIS } from '../api.config'
import { SISSchoolFeed } from '@/types/SIS/SISSchoolFeed'
import { FrappeMeta } from '@/types/Extends/FrappeMeta'

export const useGetSchoolFeedById = (schoolFeedId: string) => {
  const { data, error, isLoading, isValidating } = useFrappeGetCall<{
    message: SISSchoolFeed & FrappeMeta
  }>(
    FRAPPE_APIS.GET_SCHOOL_FEED_BY_ID.METHOD_STRING,
    { school_feed_id: schoolFeedId },
    `${FRAPPE_APIS.GET_SCHOOL_FEED_BY_ID.SWR_KEY}_${schoolFeedId}`,
  )

  const feed = data?.message
  if (feed && feed._liked_by) {
    feed.likedBy = JSON.parse(feed._liked_by)
  }

  return { error, feed, isLoading, isValidating }
}
