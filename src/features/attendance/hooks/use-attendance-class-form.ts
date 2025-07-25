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
  period: z.string().min(1, { message: 'This field is required' }),
})

export default function useAttendanceClassForm(onSuccess?: VoidFunction) {
  const [error, setError] = useState<FrappeError | null>(null)
  const { resetPassword } = useContext(AuthContext)

  const { handleCreate: createFeed } = useCreateClassFeed({})
  const { handleUpload: uploadPhotos } = useUploadClassFeedPhoto({})

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      class: undefined,
      period: undefined,
    },
  })

  const reset = () => {
    setError(null)
    form.reset()
  }

  return {
    form,
    error,
    reset,
  }
}
