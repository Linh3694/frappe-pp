import { useEffect, useState } from "react"
import RelationshipData from "@/mock-data/relationship.json"
import { RelationshipType } from "@/types/Extends/relationship"

export const useGetRelationship = (skip?: boolean) => {
    const [relationship, setRelationship] = useState<RelationshipType[]>()
  
    const fetchData = async () => {
      try {
        return Promise.resolve(RelationshipData)
      } catch (error) {
        return Promise.reject({ message: 'Failed' })
      }
    }
  
    useEffect(() => {
      if (!skip && !relationship) {
        fetchData().then((data) => setRelationship(data))
      }
    }, [skip])
  
    return { relationship }
  }