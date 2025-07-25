import { cn } from '@/core/utils/shadcn-utils'
import { Button, ButtonProps } from '@atoms/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@atoms/dialog'
import { Input } from '@atoms/input'
import { DialogTrigger } from '@radix-ui/react-dialog'
import React, {
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  useDeferredValue,
  useEffect,
  useState,
  useTransition,
} from 'react'

type Props = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    open?: boolean
    title?: string
    subtitle?: string
    variant?: 'default' | 'typing'
    inputSetting?: {
      inputLabel: ReactNode
      textConfirm: string
    }
    cancelButtonProps?: ButtonProps
    cancelButtonText?: string
    confirmButtonProps?: ButtonProps
    confirmButtonText?: string
    onConfirm?: () => void
    onClose?: () => void
  }

export default function ConfirmModal({
  open,
  className,
  children,
  title = "Title",
  subtitle,
  inputSetting,
  confirmButtonProps,
  confirmButtonText = 'Confirm',
  cancelButtonProps,
  cancelButtonText = 'Cancel',
  onConfirm,
  onClose,
  variant = 'default',
}: Props) {
  const [openDialog, setOpenDialog] = useState(false)
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [textValue, setTextValue] = useState<string>('')
  const [isPending, startTransition] = useTransition()

  function onChangeTextValue(value: string) {
    startTransition(() => {
      setTextValue(value)
    })
  }

  const handleChangeOpen = (isOpen: boolean) => {
    setOpenDialog(isOpen)
    setTextValue('')
    !isOpen && onClose?.()
  }

  const handleClickConfirm = async () => {
    onConfirm?.()
    handleChangeOpen(false)
  }

  useEffect(() => {
    open !== undefined && openDialog !== open && setOpenDialog(open)
  }, [open])

  return (
    <Dialog open={openDialog} onOpenChange={handleChangeOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={cn('max-w-[400px]', className)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {subtitle && <DialogDescription>{subtitle}</DialogDescription>}
        </DialogHeader>
        {variant === 'typing' && (
          <div className="flex flex-col gap-1">
            <label htmlFor="text-confirm" className="text-xs">
              {inputSetting?.inputLabel}
            </label>
            <Input
              id="text-confirm"
              value={textValue}
              onChange={(e) => onChangeTextValue(e.target.value)}
            />
          </div>
        )}
        <DialogFooter className="flex justify-end">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setOpenDialog(false)}
            {...cancelButtonProps}
          >
            {cancelButtonText}
          </Button>
          <Button
            type="button"
            onClick={handleClickConfirm}
            {...confirmButtonProps}
            disabled={
              variant === 'typing' &&
              textValue.trim() !== inputSetting?.textConfirm
            }
          >
            {confirmButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
