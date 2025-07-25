import React, { HTMLAttributes, useContext, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@atoms/carousel'
import PostCard, { PostCardType } from '@molecules/post-card'
import { Skeleton } from '@atoms/skeleton'
import { cn } from '@/core/utils/shadcn-utils'
import PostSlideItem from '@molecules/post-slide-item'
import Announcement from '@molecules/announcement'
import { Tray } from 'phosphor-react'
import { useGetSchoolFeedHighlight } from '@/api/feed/use-get-school-feed-highlight'
import { AuthContext } from '@/lib/auth/auth-provider'
import { cleanPath } from '@/lib/utils/common'
import { useChildren } from '@/lib/student/children-provider'
import { useLocales } from '@/core/hooks'
type Props = HTMLAttributes<HTMLDivElement> & {
  items?: PostCardType[]
  loading?: boolean
}

export default function TopNewsSlider({ className }: Props) {
  const { t } = useLocales()
  const { prefixRoute } = useContext(AuthContext)
  const [page, setPage] = useState<number>(1)
  const { current } = useChildren()
  const { feeds, error, isLoading } = useGetSchoolFeedHighlight(
    current?.person_id || '',
  )

  if (error || feeds.length == 0)
    return (
      <Announcement
        className={'!gap-1'}
        icon={
          <Tray
            size={60}
            weight="fill"
            className="text-muted-foreground opacity-20"
          />
        }
        title={
          <h4 className="text-lg font-bold opacity-80">
            {t('components.notification.news_empty.heading')}
          </h4>
        }
        subtitle={
          <p className="text-xs text-muted-foreground">
            {t('components.notification.news_empty.description')}
          </p>
        }
      />
    )
  if (isLoading)
    return (
      <div className="flex flex-col gap-5">
        <Skeleton className="h-4 w-[250px]" />
        <div className="flex gap-6">
          <Skeleton className="aspect-[4.5/3] basis-full rounded-xl md:basis-[70%] lg:basis-[40%] xl:basis-[35%]" />
          <Skeleton className="hidden aspect-[4.5/3] rounded-xl sm:block md:basis-[30%] lg:basis-[40%] xl:basis-[35%]" />
          <Skeleton className="hidden aspect-[4.5/3] rounded-xl lg:block lg:basis-[20%] xl:basis-[25%]" />
        </div>
      </div>
    )
  return (
    <div className={cn(className)}>
      <Carousel
        className="w-full"
        opts={{
          active: feeds.length > 1,
        }}
        // plugins={[AutoPlay({delay:2000})]}  // install embla-carousel-autoplay
      >
        <CarouselContent>
          {feeds.map((item, index) => (
            <CarouselItem
              key={item.title + index}
              className={cn({
                'basis-full md:basis-[70%] lg:basis-[40%] xl:basis-[35%]':
                  feeds.length === 1,
                'basis-4/6 sm:basis-[66%] md:basis-[60%] lg:basis-[45%] xl:basis-[35%]':
                  feeds.length > 1,
              })}
            >
              <PostSlideItem
                title={item.title}
                thumbnail={item.thumbnail}
                desc={item.description}
                timeAt={item.creation}
                url={cleanPath(`/${prefixRoute}/news/${item.name}`)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
    </div>
  )
}
