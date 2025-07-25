import clsx from 'clsx'
import React, { HTMLAttributes, ReactNode } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@atoms/tabs'
import Announcement from '@molecules/announcement'
import { Bell, BellSimpleZ } from 'phosphor-react'
import NotificationListItem, {
  NotificationListItemType,
} from '@molecules/notification-list-item'
import { Separator } from '@atoms/separator'
type Props = HTMLAttributes<HTMLDivElement> & {}
import { classNoti, schoolNoti } from '@/mock-data/notification.json'
import { last } from 'lodash'

export type TabItemType = {
  key: string
  label: ReactNode
  items?: NotificationListItemType[]
}

export default function NotificationTabs({ className }: Props) {
  const data: TabItemType[] = [
    {
      key: 'class',
      label: (
        <div className="flex items-center gap-2">
          Class
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-red text-xs font-bold text-white">
            1
          </div>
        </div>
      ),
      items: classNoti,
    },
    {
      key: 'school',
      label: 'School',
      items: schoolNoti,
    },
  ]

  return (
    <div className={clsx(className)}>
      <Tabs defaultValue="class">
        <TabsList className="w-full">
          {data?.map((tab, index) => (
            <TabsTrigger key={tab.key} value={tab.key} className="basis-1/2">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {data?.map((tab, index) => (
          <TabsContent key={tab.key} value={tab.key}>
            {tab.items &&
              tab.items.length > 0 &&
              tab.items?.map((item, index) => (
                <div key={index}>
                  {index != 0 && <Separator />}
                  <NotificationListItem {...item}/>
                </div>
              ))}
            {!tab.items ||
              (tab.items.length === 0 && (
                <Announcement
                  title="Nothing here!"
                  subtitle="There is no notification to show right now"
                  icon={<BellSimpleZ size={90} />}
                />
              ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
