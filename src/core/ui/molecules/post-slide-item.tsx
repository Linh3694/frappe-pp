import { useLocales } from '@/core/hooks'
import { getDateLocale } from '@/lib/utils/common'
import clsx from 'clsx'
import { format } from 'date-fns'
import moment from 'moment'
import React, { HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'

type Props = HTMLAttributes<HTMLDivElement> & PostSlideItemType & {}

export type PostSlideItemType = {
  thumbnail?: string
  title?: string
  desc?: string
  timeAt?: string
  url?: string
}

export default function PostSlideItem({
  className,
  thumbnail,
  title,
  desc,
  timeAt,
  url,
}: Props) {
  const { currentLanguage } = useLocales()
  return (
    <div
      className={clsx(
        'relative flex aspect-[4.5/3] items-end overflow-hidden rounded-xl bg-cover p-0',
        className,
      )}
    >
      <img
        className="absolute h-full w-full bg-slate-200 object-cover"
        loading="lazy"
        src={thumbnail}
        alt={`image feed - ${title}`}
      />
      <div className="absolute flex h-full w-full flex-col justify-end [background:linear-gradient(0deg,#006882_10%,rgba(0,0,0,0)_100%)] ">
        <div className="flex flex-col gap-1 px-3 py-4  sm:p-6">
          <Link
            to={url || ''}
            className="sm:text-md text-shadow:_0_1px_0_rgb(0_0_0_/_40%) line-clamp-2 text-sm font-bold text-white"
            title={title}
          >
            {title}
          </Link>
          <small className="line-clamp-1 h-0 text-xs font-medium text-white sm:h-auto xl:line-clamp-2 ">
            {desc}
          </small>
          <p className="mt-4 hidden text-xs text-white md:block">
            {format(timeAt || '', 'PP - p', {
              locale: getDateLocale(currentLanguage),
            })}
          </p>
        </div>
      </div>
    </div>
  )
}
