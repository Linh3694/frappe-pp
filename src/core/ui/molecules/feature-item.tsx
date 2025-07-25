import { cn } from '@/core/utils/shadcn-utils'
import clsx from 'clsx'
import { IconProps } from 'phosphor-react'
import React, {
  ForwardRefExoticComponent,
  HTMLAttributes,
  ReactNode,
} from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
  icon: ReactNode
  iconClassName?: string
  label?: string
  disabled?: boolean
}

export default function FeatureItem({
  className,
  icon,
  iconClassName,
  label,
  disabled,
}: Props) {
  return (
    <div
      className={cn(
        'flex w-fit flex-col items-center gap-1 py-1',
        {
          'opacity-30': disabled,
        },
        className,
      )}
    >
      {icon}
      {label && <p className="text-center text-sm">{label}</p>}
    </div>
  )
}
