import { cn } from '@/core/utils/shadcn-utils'
import React, { HTMLAttributes, ReactNode } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
  title: ReactNode
  subtitle?: ReactNode
  action: ReactNode
}

export default function FileListItem({
  className,
  title,
  subtitle,
  action,
}: Props) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-8 rounded-lg border bg-background p-4 shadow-sm',
        className,
      )}
    >
      <div>
        {title && (
          <div className="font-semibold text-brand-secondary">{title}</div>
        )}
        {subtitle && <div className="text-gray-500">{subtitle}</div>}
      </div>
      {action}
    </div>
  )
}
