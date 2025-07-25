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
import { useTranslation } from 'react-i18next'

type Props = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    onSubmitForm?: (feed?: SISClassFeed) => void
  }
export default function CreateFeedModal({
  className,
  children,
  onSubmitForm,
}: Props) {
  const [open, setOpen] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const { mutate } = useSWRConfig()
  const { form, error, handleCreate, reset } = useFeedForm()
  const { toast } = useToast()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    reset()
  }

  const handleClickSubmit = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true }),
      )
    }
  }

  const handleSubmitForm = (data: any, photos: File[]) =>
    handleCreate(data, photos)
      .then((id) => {
        handleOpenChange(false)
        // window.location.reload()
        onSubmitForm?.(id)
        form.reset()
      })
      .catch((e) => true)

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
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="top-10 flex h-[90vh] w-[700px] max-w-[100vw] translate-y-0 flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {t('components.modals.create_feed.heading')}
          </DialogTitle>
          <DialogDescription>
            {t('components.modals.create_feed.description')}
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-x-hidden px-2">
          {open && (
            <FeedForm
              ref={formRef}
              form={form}
              error={error}
              handleSubmit={handleSubmitForm}
            />
          )}
        </div>
        <DialogFooter className="flex justify-end">
          <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
            {t('components.buttons.cancel')}
          </Button>
          <Button
            type="button"
            onClick={handleClickSubmit}
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {t('components.buttons.create')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
