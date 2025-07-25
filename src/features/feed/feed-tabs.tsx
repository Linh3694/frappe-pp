import { Carousel, CarouselContent, CarouselItem } from '@atoms/carousel'
import { HTMLAttributes, type FC } from 'react'
import { cn } from '@/core/utils/shadcn-utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@atoms/tabs'
import { capitalize } from 'lodash'
import { useLocales, useResponsive } from '@/core/hooks'
import PostListItem, { PostListItemType } from '@molecules/post-list-item'
import { Button } from '@atoms/button'
import Announcement from '@molecules/announcement'
import { Tray } from 'phosphor-react'
import { useGetSchoolFeed } from '@/api/feed/use-get-school-feed'

type Props = HTMLAttributes<HTMLDivElement> & {}

export default function FeedTabs({ className }: Props) {
  const { isDesktop } = useResponsive()
  const { feeds, error, isLoading, isValidating } = useGetSchoolFeed('123')

  const { t } = useLocales()

  // if (error) return null

  return (
    <div className={cn('flex', className)}>
      <Tabs defaultValue="school" className="flex w-full flex-col">
        <div>
          <TabsList className="h-9 w-40">
            <TabsTrigger className="basis-1/2 py-1" value="school">
              {t('school')}
            </TabsTrigger>
            <TabsTrigger className="basis-1/2 py-1" value="class">
              {t('class')}
            </TabsTrigger>
          </TabsList>
        </div>
        <div
          className={cn(
            'mt-2 flex flex-1 rounded-lg border bg-background p-4 shadow-sm',
            !isDesktop && 'px-4',
          )}
        >
          {['school', 'class'].map((feedType) => (
            <TabsContent key={feedType} className="w-full" value={feedType}>
              {(!feeds || feeds.length == 0) && (
                <Announcement
                  className={'!gap-1'}
                  icon={
                    <Tray
                      size={60}
                      weight="fill"
                      className="text-brand-secondary opacity-20"
                    />
                  }
                  title={
                    <h4 className="text-lg font-semibold opacity-80">
                      No feed!
                    </h4>
                  }
                  subtitle={
                    <p className="text-xs text-muted-foreground">
                      You have no feed at this moment
                    </p>
                  }
                />
              )}
              <div className="flex flex-col gap-2">
                {feeds?.map((item, index) => (
                  <PostListItem
                    key={item.title + index}
                    title={item.title}
                    thumbnail={item.thumbnail}
                    desc={item.description}
                    timeAt={item.creation}
                    url={`/feed/${item.name}`}
                  />
                ))}
              </div>
              {feeds.length > 0 && (
                <Button
                  variant="link"
                  className="text-center text-brand-secondary"
                >
                  Show more
                </Button>
              )}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  )
}
