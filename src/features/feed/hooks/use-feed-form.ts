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
  class: z.string().min(1, { message: 'This field is required' }),
  title: z.string().min(1, { message: 'This field is required' }),
  //   photos: z.string().array().min(1),
  photos: FileSchema.array().min(1, {
    message: 'The Article must have least a image.',
  }),
  status: z.string().min(1, { message: 'This field is required' }),
  public_time: z.string().min(1, { message: 'This field is required' }),
  description: z.string(),
  content: z.string(),
})

export default function useFeedForm(onSuccess?: VoidFunction) {
  const [error, setError] = useState<FrappeError | null>(null)
  const { resetPassword } = useContext(AuthContext)

  const { handleCreate: createFeed } = useCreateClassFeed({})
  const { handleUpload: uploadPhotos } = useUploadClassFeedPhoto({})

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      class: undefined,
      title: '',
      photos: [],
      status: 'Public',
      public_time: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      description: '',
      content: '',
    },
  })

  const handleCreate = async (
    data: SISClassFeed & { class: string },
    photos: File[],
  ) => {
    try {
      const objClass = JSON.parse(data.class)
      const formatedData = {
        ...data,
        public_time: format(
          data.public_time || new Date(),
          'yyyy-MM-dd HH:mm:ss',
        ),
        class_type: objClass.classType,
        school_class: objClass.classType === 'School Class' && objClass.classId || undefined,
        course_class: objClass.classType === 'Course Class' && objClass.classId || undefined,
      }
      const feed = await createFeed(formatedData)

      if (feed) {
        await uploadPhotos(photos, feed.name)
      }

      return Promise.resolve(feed)
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
