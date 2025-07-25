import { FRAPPE_APIS } from '../api.config'
import { useEffect, useState } from 'react'
import axios from 'axios'
import env from '@/config/env'
import { ProvinceType } from '@/types/Extends/Provinces'

export const useGetProvince = (provinceId?: string, skip?: boolean) => {
  const [province, setProvince] = useState<ProvinceType>()

  const fetchData = async () => {
    if (provinceId) {
      // console.log('provinceId', provinceId)

      try {
        const res = await fetch(
          `${env.PROVINCES_VN_API}${FRAPPE_APIS.GET_PROVINCE.METHOD_STRING.replace('{{code}}', provinceId.toString())}`,
        )
        const data = await res.json()

        return Promise.resolve(data)
      } catch (error) {
        return Promise.reject({ message: 'Failed' })
      }
    } else {
      return Promise.resolve({})
    }
  }

  useEffect(() => {
    if (provinceId && province) {
      fetchData().then((data) => setProvince(data))
    }
  }, [provinceId])

  useEffect(() => {
    if (!skip && !province) {
      fetchData().then((data) => setProvince(data))
    }
  }, [skip])

  return { province }
}
