import { cn } from '@/core/utils/shadcn-utils'
import { Avatar, AvatarFallback, AvatarImage } from '@atoms/avatar'
import moment from 'moment'
import { DotsThreeOutlineVertical, User } from 'phosphor-react'
import React, { Children, HTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import CarouselEnhanced from './carousel-enhanced'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@atoms/dropdown-menu'
import { useLocales } from '@/core/hooks'
import { getDateLocale } from '@/lib/utils/common'
import { format } from 'date-fns'
type Props = HTMLAttributes<HTMLDivElement> & {
  icon?: ReactNode
  title?: string
  desc?: string
  to?: string
  disabled?: boolean
}

export default function PanelLink({
  className,
  icon,
  title,
  desc,
  to = '',
  disabled = false,
}: Props) {
  //   const { currentLanguage } = useLocales()

  return (
    <Link to={to} style={{ pointerEvents: disabled ? 'none' : 'all' }}>
      <div
        className={cn(
          'flex cursor-pointer flex-col items-center gap-0 rounded-lg border-2 px-3 py-5 sm:flex-row sm:gap-20 sm:p-10',
          {
            'opacity-50': disabled,
          },
          className
        )}
      >
        <div className="relative inline-block">{icon}</div>
        <div className="flex flex-col text-center sm:text-left">
          <p className="cursor-pointer text-lg font-bold text-primary hover:text-brand-secondary sm:text-2xl">
            {title}
          </p>
          <p className="sm:text-md text-sm text-muted-foreground">{desc}</p>
        </div>
      </div>
    </Link>
  )
}
