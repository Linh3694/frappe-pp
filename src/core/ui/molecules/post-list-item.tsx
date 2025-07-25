import { useLocales, useResponsive } from '@/core/hooks'
import { cn } from '@/core/utils/shadcn-utils'
import { getDateLocale } from '@/lib/utils/common'
import { format } from 'date-fns'
import { Heart } from 'lucide-react'
import moment from 'moment'
import { NotePencil, Trash } from 'phosphor-react'
import React, { HTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Props = HTMLAttributes<HTMLDivElement> & PostListItemType & {}

export type PostListItemType = {
  url: string
  thumbnail?: string
  title: string
  desc?: string
  timeAt?: string
  variant?: 'grid' | 'inline'
  actions?: ReactNode
}

export default function PostListItem({
  className,
  url,
  thumbnail,
  title,
  desc,
  timeAt,
  variant = 'inline',
  actions,
}: Props) {
  const { isDesktop } = useResponsive()
  const { currentLanguage } = useLocales()

  return (
    <div
      className={cn(
        'flex flex-col justify-between gap-2 sm:gap-6',
        {
          'sm:flex-row': variant === 'inline',
        },
        className,
      )}
    >
      {thumbnail && (
        <Link
          to={url || ''}
          className={cn(
            'aspect-[4/1.5] basis-full overflow-hidden rounded-md bg-card-foreground sm:aspect-[4.5/3] sm:basis-[200px] ',
          )}
        >
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover"
          />
        </Link>
      )}

      <div className="flex flex-1 flex-col justify-between gap-2">
        <div>
          <Link to={url || ''}>
            <p className="text-md line-clamp-2 font-semibold text-primary hover:text-brand-secondary sm:text-xl">
              {title}
            </p>
          </Link>
          {isDesktop && (
            <p className="line-clamp-3 text-sm text-muted-foreground/70">
              {desc}
            </p>
          )}
        </div>
        <div className="flex justify-between">
          {timeAt && (
            <p className="text-xs text-gray-500">
              {/* {moment(timeAt).format('DD/MMM/YYYY - hh:mm A')} */}
              {format(timeAt, 'PP - p', {
                locale: getDateLocale(currentLanguage),
              })}
            </p>
          )}
          {actions}
        </div>
      </div>
    </div>
  )
}
