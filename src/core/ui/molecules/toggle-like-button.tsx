import { cn } from '@/core/utils/shadcn-utils'
import { Heart, Plus } from 'phosphor-react'
import React, { HTMLAttributes, ReactNode } from 'react'

type Props = HTMLAttributes<HTMLButtonElement> & {
  active?: boolean
  count?: number
  onClick?: () => void,
  disabled?: boolean
}

export default function ToggleLikeButton({
  className,
  active = false,
  count = 0,
  onClick = () => {},
  disabled = false,
}: Props) {
  return (
    <span
      className="flex gap-2"
      style={{ pointerEvents: disabled ? 'none' : 'all' }}
    >
      <Heart
        size={18}
        className={cn('cursor-pointer', { 'text-destructive': active })}
        weight={active ? 'fill' : 'regular'}
        onClick={onClick}
      />
      <span className="text-xs sm:text-sm ">{count}</span>
    </span>
  )
}
