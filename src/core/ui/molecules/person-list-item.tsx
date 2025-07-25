import {
  HTMLAttributes,
  ReactNode,
  useState,
  useTransition,
  type FC,
} from 'react'
import { cn } from '@/core/utils/shadcn-utils'
import { Avatar, AvatarImage } from '@atoms/avatar'
import { genAvatarDefault } from '@/lib/utils/common'
import { Skeleton } from '@atoms/skeleton'

export type PersonListItemProps = HTMLAttributes<HTMLDivElement> & {
  id?: string
  avatar?: string
  name: string
  metadata?: string
  action?: ReactNode
}

export const PersonListItem: FC<PersonListItemProps> = ({
  className,
  id,
  avatar,
  name,
  metadata,
  action,
}) => {
  if (!name) return null
  return (
    <div className={cn('flex items-center justify-between gap-2', className)}>
      <div className="flex gap-3 sm:gap-5">
        <Avatar className="h-12 w-12 border bg-card-foreground">
          <AvatarImage
            className="object-cover"
            src={avatar || genAvatarDefault(name)}
          />
        </Avatar>
        <div>
          <p className="sm:text-md text-sm font-bold text-primary">{name}</p>
          {metadata && (
            <p className="text-xs text-muted-foreground sm:text-sm">
              {metadata}
            </p>
          )}
        </div>
      </div>
      {action}
    </div>
  )
}
export const PersonListSkeletonItem: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
}) => {
  return (
    <div className={cn('flex items-center justify-between gap-5', className)}>
      <Skeleton className="h-16 w-16 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
