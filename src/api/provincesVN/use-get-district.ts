import { FRAPPE_APIS } from '../api.config'
import { useEffect, useState } from 'react'
import axios from 'axios'
import env from '@/config/env'
import { DistrictType } from '@/types/Extends/Provinces'

export const useGetDistrict = (
  provinceId?: string,
  skip?: boolean,
) => {
  const [district, setDistrict] = useState<DistrictType>()

  const fetchData = async () => {
    if (provinceId) {
      try {
        const res = await fetch(
          `${env.PROVINCES_VN_API}${FRAPPE_APIS.GET_DISTRICT.METHOD_STRING.replace('{{code}}', provinceId.toString())}`,
        )
        const data = await res.json()
        console.log(data);
        
        return Promise.resolve(data)
      } catch (error) {
        return Promise.reject({ message: 'Failed' })
      }
    }else{
      return Promise.resolve({})
    }
  }

  useEffect(() => {
    if (district) {
      fetchData().then((data) => setDistrict(data))
    }
  }, [provinceId])

  useEffect(() => {
    if (!skip && !district) {
      fetchData().then((data) => setDistrict(data))
    }
  }, [skip])

  return { district }
}
