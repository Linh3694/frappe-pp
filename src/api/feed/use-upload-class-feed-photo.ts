import { useFrappeFileUpload } from 'frappe-react-sdk'
import { useState } from 'react'
import { FRAPPE_APIS } from '../api.config'
import { SISClassFeedPhoto } from '@/types/SIS/SISClassFeedPhoto'

type Props = {
  onSuccess?: VoidFunction
}
export const useUploadClassFeedPhoto = ({ onSuccess }: Props) => {
  const [loading, setLoading] = useState(false)
  const { upload } = useFrappeFileUpload()

  const handleUpload = async (files: File[], classFeedId: string) => {
    // console.log('FILES INCOME', files)
    try {
      setLoading(true)
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        await upload(
          file,
          {
            isPrivate: true,
            doctype: 'SIS Class Feed',
            otherData: {
              class_feed_id: classFeedId,
            },
            fieldname: 'photo',
          },
          FRAPPE_APIS.UPLOAD_CLASS_FEED_PHOTO.METHOD_STRING,
        )
      }
      return Promise.resolve(true)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return { loading, handleUpload }
}
