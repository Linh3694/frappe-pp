import {
  useFrappeGetCall,
  useFrappePostCall,
  useSWRConfig,
} from 'frappe-react-sdk'

import { FRAPPE_APIS } from '../api.config'
import { SISClassFeed } from '@/types/SIS/SISClassFeed'
import { FrappeMeta } from '@/types/Extends/FrappeMeta'
import { useState } from 'react'

export const useToggleLike = () => {
  const { call: submitLike } = useFrappePostCall<{
    message: any[]
  }>(FRAPPE_APIS.TOGGLE_LIKE.METHOD_STRING)
  const [result, setResult] = useState<any>()

  const handleToggle = async (
    docType: string,
    docId: string,
    index: number,
  ) => {
    try {
      await submitLike({ doctype: docType, name: docId })
      return Promise.resolve(docId)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return { result, handleToggle }
}
