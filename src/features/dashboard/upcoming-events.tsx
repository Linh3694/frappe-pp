import { HTMLAttributes, useEffect, useState, type FC } from 'react'
// import { upcomingEvents } from '@/mock-data/upcoming-events.json'
import { format } from 'date-fns'
import EventListItem from '@molecules/event-list-item'
import { useLocales } from '@/core/hooks'
import { cn } from '@/core/utils/shadcn-utils'
import { useGetUpcomingEvents } from '@/api/schoolYear/use-get-upcoming-events'
import { Button } from '@atoms/button'
import Announcement from '@molecules/announcement'
import { Tray } from 'phosphor-react'
import { EventDetailModal } from '@features/events/event-detail-modal'

export type Props = HTMLAttributes<HTMLDivElement> & {}

const getMoreCount = 5

export const UpcomingEvents: FC<Props> = ({ className }) => {
  const { t } = useLocales()
  const [page, setPage] = useState<number>(1)
  const [stack, setStack] = useState<typeof upcomingEvents>([])
  const { upcomingEvents, totalCount, isValidating, totalPage } =
    useGetUpcomingEvents({ limit: getMoreCount, page })

  const updateStack = (input: typeof upcomingEvents) => {
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
    if (upcomingEvents.length > 0) {
      updateStack(upcomingEvents)
    }
  }, [JSON.stringify(upcomingEvents)])
  // console.log(totalPage)
  return (
    <div
      className={cn(
        'w-full rounded-lg border bg-card p-4 shadow-sm',
        className,
      )}
    >
      <div className="mb-4 text-lg font-semibold text-primary">
        {t('upcoming_events')}
      </div>
      <div className="flex flex-col gap-0">
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
              <h4 className="text-lg font-semibold">
                {t('components.notification.events_empty.heading')}
              </h4>
            }
            subtitle={
              <p className="text-xs">
                {t('components.notification.events_empty.description')}
              </p>
            }
          />
        )}
        {stack?.map((event) => (
          <EventDetailModal data={event} key={event.title + event.start_date}>
            <EventListItem
              className="rounded-lg p-4 hover:bg-border/30"
              key={event.title + event.start_date}
              title={event.title}
              // desc={event.description}
              date={event.start_date}
            />
          </EventDetailModal>
        ))}

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
      </div>
    </div>
  )
}
