import { useFrappeDeleteDoc, useSWRConfig } from 'frappe-react-sdk'
import { FRAPPE_APIS } from '../api.config'

export const useDeleteFeed = (
  docType: 'SIS Class Feed' | 'SIS School Feed',
) => {
  const { deleteDoc, error } = useFrappeDeleteDoc()

  const handleDelete = async (classFeedId: string) =>
    deleteDoc(docType, classFeedId)

  return { handleDelete, error }
}
