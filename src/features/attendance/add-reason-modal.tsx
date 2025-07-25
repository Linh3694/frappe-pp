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
import { HTMLAttributes, PropsWithChildren, useState } from 'react'
import { Textarea } from '@atoms/textarea'
import { useLocales } from '@/core/hooks'

type Props = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    onSave?: (reason: string) => void
  }
export default function AddReasonModal({ className, children, onSave }: Props) {
  const { t } = useLocales()
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState('')

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    // reset()
  }

  const handleSave = () => {
    setOpen(false)
    onSave?.(reason)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex flex-col">
        <DialogHeader>
          <DialogTitle>{t('components.modals.add_reason.heading')}</DialogTitle>
          <DialogDescription>
            {t('components.modals.add_reason.description')}
          </DialogDescription>
        </DialogHeader>
        <Textarea value={reason} onChange={(e) => setReason(e.target.value)} />
        <DialogFooter className="flex justify-end">
          <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
            {t('components.buttons.cancel')}
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            // disabled={form.formState.isSubmitting}
          >
            {/* {form.formState.isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )} */}
            {t('components.buttons.save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
