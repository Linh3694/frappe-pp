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
import { genAvatarDefault, getDateLocale } from '@/lib/utils/common'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
type Props = HTMLAttributes<HTMLDivElement> & PostCardType & {}

export type PostCardType = {
  photos?: string[]
  title?: string
  desc?: string
  timeAt?: string
  authorName?: string
  authorImage?: string
  url?: string
  actions?: ReactNode
  menuSettings?: MenuSettingsItemType[]
}

export type MenuSettingsItemType = {
  label?: ReactNode
  onClick?: VoidFunction
}

export default function PostCard({
  className,
  photos,
  title,
  desc,
  timeAt,
  authorName,
  authorImage,
  url,
  actions,
  menuSettings,
}: Props) {
  const { currentLanguage } = useLocales()
  const { t } = useTranslation()

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl bg-card bg-cover p-0 shadow-md',
        className,
      )}
    >
      <div className="flex w-full items-center justify-between p-3 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border-2">
            <AvatarImage
              className="object-cover bg-card-foreground"
              src={authorImage || genAvatarDefault(authorName)}
            />
            <AvatarFallback>{'AD'}</AvatarFallback>
          </Avatar>
          <div className="text-sm font-semibold">{authorName}</div>
        </div>
        {menuSettings && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <DotsThreeOutlineVertical
                className="cursor-pointer"
                size={18}
                weight="fill"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-m-32">
              {menuSettings.map((item, key) => (
                <DropdownMenuItem
                  onClick={item.onClick}
                  key={key}
                  className="cursor-pointer px-2 py-0 hover:bg-slate-100"
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <CarouselEnhanced className="w-full bg-card-foreground">
        {photos?.map((url, key) => (
          <img
            key={key}
            className="h-full w-full bg-card-foreground object-contain"
            width={700}
            height={300}
            alt={`image feed - ${title}`}
            src={url}
            loading="lazy"
          />
        ))}
      </CarouselEnhanced>

      <div className="w-full">
        <div className="flex flex-col gap-1 px-3 py-4 sm:p-6">
          <Link
            to={url || ''}
            className="line-clamp-2 text-sm font-semibold text-primary hover:text-brand-secondary sm:text-xl lg:text-xl"
            title={title}
          >
            {title}
          </Link>
          <p className="line-clamp-2 text-xs font-medium opacity-80 sm:text-base sm:opacity-70">
            {desc}
          </p>
          <div className="mt-4 flex items-center justify-between gap-2">
            <p className="space-x-1 text-sm opacity-70">
              {t('post_at', {
                time:
                  timeAt &&
                  format(timeAt, 'PP - p', {
                    locale: getDateLocale(currentLanguage),
                  }),
              })}
            </p>
            {actions}
          </div>
        </div>
      </div>
    </div>
  )
}
