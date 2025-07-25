import { cn } from '@/core/utils/shadcn-utils'
import clsx from 'clsx'
import { IconProps } from 'phosphor-react'
import React, {
  ForwardRefExoticComponent,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from 'react'

type Props = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    icon?: ReactNode
    variant?: 'horizontal' | 'vertical'
    label?: ReactNode
  }

export default function MonitorBox({
  className,
  icon,
  variant = 'horizontal',
  label,
  children,
}: Props) {
  if (variant === 'horizontal')
    return (
      <div
        className={cn(
          'flex h-full w-full justify-between gap-4 rounded-lg border bg-background p-4 shadow-sm',
          className,
        )}
      >
        <div className="flex items-center gap-2">
          {icon}
          {label && <div className="text-sm text-gray-400">{label}</div>}
        </div>
        <div className="flex items-center gap-2 text-lg font-semibold">
          {children}
        </div>
      </div>
    )
  if (variant === 'vertical')
    return (
      <div
        className={cn(
          'h-full w-full items-center gap-4 rounded-lg border bg-background p-4 shadow-sm',
          className,
        )}
      >
        <div className="w-full flex flex-col justify-between gap-2 items-center">
          {icon}
          {label && <div className="text-sm text-gray-400  text-center">{label}</div>}
          <div className="flex items-center gap-2 text-lg font-semibold">
            {children}
          </div>
        </div>
      </div>
    )
}
