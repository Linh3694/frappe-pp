import { Carousel, CarouselContent, CarouselItem } from '@atoms/carousel'
import { HTMLAttributes, useContext, useEffect, useState, type FC } from 'react'
import { cn } from '@/core/utils/shadcn-utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@atoms/tabs'
import { capitalize } from 'lodash'
import { useLocales, useResponsive } from '@/core/hooks'
import PostListItem, { PostListItemType } from '@molecules/post-list-item'
import { Button } from '@atoms/button'
import Announcement from '@molecules/announcement'
import { Tray } from 'phosphor-react'
import { Card, CardContent } from '@atoms/card'
import { useGetSchoolFeed } from '@/api/feed/use-get-school-feed'
import { AuthContext } from '@/lib/auth/auth-provider'
import { cleanPath } from '@/lib/utils/common'
import { useChildren } from '@/lib/student/children-provider'
import { twMerge } from 'tailwind-merge'

type Props = HTMLAttributes<HTMLDivElement> & {}

const getMoreCount = 3

export default function NewsList({ className }: Props) {
  const { t } = useLocales()
  const { isDesktop } = useResponsive()
  const { prefixRoute } = useContext(AuthContext)
  const [page, setPage] = useState<number>(1)
  const { current } = useChildren()
  const { feeds, error, isLoading, totalCount, totalPage, isValidating } =
    useGetSchoolFeed(current?.person_id || '', getMoreCount, page)
  const [stack, setStack] = useState<typeof feeds>([])

  const updateStack = (input: typeof feeds) => {
    if (input.length > 0) {
      let temp = [...stack]
      input.map((item) => {
        let index = temp.findIndex((i) => i.name === item.name)
        if (index === -1) {
          temp.push(item)
        } else {
          temp[index] = item
        }
      })
      setStack(temp)
    }
  }

  useEffect(() => {
    if (feeds.length > 0) {
      updateStack(feeds)
    }
  }, [JSON.stringify(feeds)])

  return (
    <Card className={twMerge(' bg-card')}>
      <CardContent className="py-5">
        {(!stack || stack.length == 0) && (
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
              <h4 className="text-lg font-bold">
                {t('components.notification.news_empty.heading')}
              </h4>
            }
            subtitle={
              <p className="text-xs">
                {t('components.notification.news_empty.description')}
              </p>
            }
          />
        )}
        <div className="flex flex-col gap-2 gap-y-5">
          {stack?.map((item, index) => (
            <PostListItem
              key={item.title + index}
              title={item.title}
              thumbnail={item.thumbnail}
              desc={item.description}
              timeAt={item.creation}
              url={cleanPath(`/${prefixRoute}/news/${item.name}`)}
            />
          ))}
        </div>
        {stack.length > 0 && stack.length < totalCount && (
          <center>
            <Button
              variant="link"
              className="text-center text-brand-secondary"
              disabled={isValidating}
              onClick={() =>
                setPage((page) => (page < totalPage ? page + 1 : page))
              }
            >
              {t('components.buttons.show_more')}
            </Button>
          </center>
        )}
      </CardContent>
    </Card>
  )
}
