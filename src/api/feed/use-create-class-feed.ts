import { useFrappePostCall, useSWRConfig } from 'frappe-react-sdk'

import { FRAPPE_APIS } from '../api.config'
import { SISClassFeed } from '@/types/SIS/SISClassFeed'

type Props = {}

export const useCreateClassFeed = ({}: Props) => {
  const { call: submitCreate } = useFrappePostCall<{
    message: SISClassFeed
  }>(FRAPPE_APIS.CREATE_CLASS_FEED.METHOD_STRING)

  const handleCreate = async (data: SISClassFeed) => {
    try {
      const classFeed = await submitCreate({
        doc: data
      })
      return Promise.resolve(classFeed.message)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return { handleCreate }
}
