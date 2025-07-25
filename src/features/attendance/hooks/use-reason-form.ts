import { AuthContext } from '@/lib/auth/auth-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { FrappeError } from 'frappe-react-sdk'
import { useCallback, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { format } from 'date-fns'
import { SISClassFeed } from '@/types/SIS/SISClassFeed'
import { reject } from 'lodash'
import { useCreateClassFeed } from '@/api/feed/use-create-class-feed'
import { useUploadClassFeedPhoto } from '@/api/feed/use-upload-class-feed-photo'

const FileSchema = z.instanceof(File).optional()

const validationSchema = z.object({
  reason: z.string().min(1, { message: 'This field is required' }),
})

export default function useReasonForm(onSuccess?: VoidFunction) {
  const [error, setError] = useState<FrappeError | null>(null)

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      reason: '',
    },
  })

  const handleCreate = async (data: SISClassFeed, photos: File[]) => {
    try {
      // const feed = await createFeed({
      //   ...data,
      //   photos: [],
      // })

      // if (feed) {
      //   await uploadPhotos(photos, feed.name)
      // }

      return Promise.resolve()
    } catch (error: any) {
      setError(error)
      return Promise.reject(error)
    }
  }

  const reset = () => {
    setError(null)
    form.reset()
  }

  return {
    form,
    error,
    handleCreate,
    reset,
  }
}
