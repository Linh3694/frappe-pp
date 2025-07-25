import {
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  useState,
  type FC,
} from 'react'
import { cn } from '@/core/utils/shadcn-utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@atoms/dialog'
import { Button } from '@atoms/button'

export type AlertModalProps = PropsWithChildren & {
  title?: ReactNode
  desc?: ReactNode
  footer?: boolean
  cancelButton?: boolean
  cancelText?: string
  okButton?: boolean
  okText?: string
  okOnClick?: () => void
  className?: string
  open?: boolean
}

export type AlertContentType = {
  open?: boolean
  title?: ReactNode
  desc?: ReactNode
}

export const AlertModal: FC<AlertModalProps> = ({
  title,
  desc,
  footer = true,
  cancelButton = true,
  cancelText = 'Cancel',
  okButton = true,
  okText = 'Ok',
  okOnClick,
  className,
  open = false,
  children,
}) => {
  const [openDialog, setOpenDialog] = useState(open)
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={cn(className)}>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {desc && <DialogDescription>{desc}</DialogDescription>}
        </DialogHeader>
        {footer && (
          <DialogFooter>
            {cancelButton && <Button variant="outline">{cancelText}</Button>}
            {okButton && <Button onClick={okOnClick}>{okText}</Button>}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
