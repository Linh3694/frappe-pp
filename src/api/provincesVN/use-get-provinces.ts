import { FRAPPE_APIS } from '../api.config'
import { useEffect, useState } from 'react'
import axios from 'axios'
import env from '@/config/env'
import { ProvinceType } from '@/types/Extends/Provinces'

export const useGetProvinces = (skip?: boolean) => {
  const [provinces, setProvinces] = useState<ProvinceType[]>()

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${env.PROVINCES_VN_API}${FRAPPE_APIS.GET_PROVINCES.METHOD_STRING}`,
      )
      const data = await res.json()
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject({ message: 'Failed' })
    }
  }

  useEffect(() => {
    if (!skip && !provinces) {
      fetchData().then((data) => setProvinces(data))
    }
  }, [skip])

  return { provinces }
}
