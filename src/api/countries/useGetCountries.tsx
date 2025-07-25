import { CountryType } from "@/types/Extends/Country"
import { useEffect, useState } from "react"
import CountriesData from "@/mock-data/countries.json"

export const useGetCountries = (skip?: boolean) => {
    const [countries, setCountries] = useState<CountryType[]>()
  
    const fetchData = async () => {
      try {
        return Promise.resolve(CountriesData)
      } catch (error) {
        return Promise.reject({ message: 'Failed' })
      }
    }
  
    useEffect(() => {
      if (!skip && !countries) {
        fetchData().then((data) => setCountries(data))
      }
    }, [skip])
  
    return { countries }
  }