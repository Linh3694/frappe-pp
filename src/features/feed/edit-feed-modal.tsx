import { Button } from '@atoms/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@atoms/dialog'
import { DialogTrigger } from '@radix-ui/react-dialog'
import React, {
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import styled from 'styled-components'
import FeedForm from './feed-form'
import { ScrollArea } from '@radix-ui/themes'
import { Separator } from '@atoms/separator'
import { Loader2 } from 'lucide-react'
import useFeedForm from './hooks/use-feed-form'
import { useSWRConfig } from 'frappe-react-sdk'
import { FRAPPE_APIS } from '@/api/api.config'
import { useToast } from '@atoms/use-toast'
import { useNavigate } from 'react-router-dom'
import { SISClassFeed } from '@/types/SIS/SISClassFeed'
import { useGetClassFeedById } from '@/api/feed/use-get-class-feed-by-id'
import moment from 'moment'

type Props = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    open?: boolean
    feedId?: string
    onSubmitForm?: (feed?: SISClassFeed) => void
    onClose?: () => void
  }
export default function EditFeedModal({
  open,
  feedId,
  className,
  children,
  onSubmitForm,
  onClose,
}: Props) {
  const [openDialog, setOpenDialog] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const { mutate } = useSWRConfig()
  const { form, error, handleCreate, reset } = useFeedForm()
  const { feed } = useGetClassFeedById(feedId || '')
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleOpenChange = (isOpen: boolean) => {
    setOpenDialog(isOpen)
    reset()
    !isOpen && onClose?.()
  }

  const handleClickSubmit = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true }),
      )
    }
  }

  const handleSubmitForm = (data: any, photos: File[]) => {
    console.log(data, photos)
  }

  useEffect(() => {
    open !== undefined && openDialog !== open && setOpenDialog(open)
  }, [open])

  useEffect(() => {
    if (feed) {
      form.reset({
        school_class: feed?.school_class,
        title: feed?.title,
        description: feed?.description,
        content: feed?.content,
        status: feed?.status,
        public_time: feed?.public_time,
        photos: feed?.photos?.map(
          (p) => new File([], p.photo),
        ),
      })
    }
  }, [JSON.stringify(feed)])

  // useEffect(() => {
  //   if (error) {
  //     toast({
  //       title: error.message || 'Error',
  //       description: typeof error === 'string' ? error : error.exception,
  //       variant: 'destructive',
  //     })
  //   }
  // }, [JSON.stringify(error)])

  return (
    <Dialog open={openDialog} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="top-10 flex h-[90vh] w-[700px] max-w-[100vw] translate-y-0 flex-col">
        <DialogHeader>
          <DialogTitle>Design Your Feed</DialogTitle>
          <DialogDescription>
            Fill out the information to start your feed. Enjoy content tailored
            to your preferences.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-x-hidden px-2">
          {openDialog && (
            <FeedForm
              ref={formRef}
              form={form}
              error={error}
              handleSubmit={handleSubmitForm}
            />
          )}
        </div>
        <DialogFooter className="flex justify-end">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setOpenDialog(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleClickSubmit}
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
