import React, { ReactNode } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@atoms/avatar'
import { cn } from '@/core/utils/shadcn-utils'
import { genAvatarDefault, getInitials } from '@/lib/utils/common'
import { ArrowsCounterClockwise } from 'phosphor-react'
import { Button } from '@atoms/button'

type Props = {
  className?: string
  variant?: 'small' | 'large'
  avatar?: string
  avatarAlt?: string
  name?: ReactNode
  subInfo?: ReactNode
  metaData?: ReactNode
  action?: ReactNode
}

export default function UserProfileCard({
  variant = 'small',
  ...props
}: Props) {
  if (variant === 'small') return <ProfileCardSmall {...props} />
  if (variant === 'large') return <ProfileCardLarge {...props} />
}

export const ProfileCardSmall = ({
  className,
  avatar,
  avatarAlt,
  name,
  subInfo,
}: Props) => {
  // console.log(avatar);

  return (
    <div className={cn('w-full rounded-lg p-2 shadow-sm', className)}>
      {/* <div className="text-brand-teal">Student</div> */}
      <div className="flex w-full items-center gap-2">
        <Avatar className="border bg-card-foreground">
          <AvatarImage
            className="object-cover"
            src={avatar || genAvatarDefault(avatarAlt)}
          />
          <AvatarFallback>{avatarAlt && getInitials(avatarAlt)}</AvatarFallback>
        </Avatar>
        {/* {typeof avatar !== 'string' && avatar} */}
        <div>
          <div className="text-sm font-semibold text-brand-secondary">
            {name}
          </div>
          <div className="text-sm text-muted-foreground">{subInfo}</div>
        </div>
      </div>
    </div>
  )
}

export const ProfileCardLarge = ({
  className,
  avatar,
  avatarAlt,
  name,
  subInfo,
  metaData,
  action,
}: Props) => {
  return (
    <div
      className={cn(
        'h-full w-full rounded-lg bg-card p-4 shadow-sm',
        className,
      )}
    >
      <div className="flex h-full items-center justify-between gap-2 rounded-xl shadow-sm">
        <div className="space-y-5">
          <div className="space-y-1">
            <div className="text-sm opacity-75">{subInfo}</div>
            <div className="text-2xl">{name}</div>
            <div className="text-sm opacity-80">{metaData}</div>
          </div>
          {/* {actions} */}
        </div>
        <div className="pr-[5px]">
          <div className="relative">
            <Avatar className="h-16 w-16 border bg-card-foreground">
              <AvatarImage
                className="object-cover"
                src={avatar || genAvatarDefault(avatarAlt)}
              />
              <AvatarFallback>
                {avatarAlt && getInitials(avatarAlt)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-[-5px]">{action}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
