import { HTMLAttributes, useMemo, type FC } from 'react'

import {
  Chat,
  ChatCircle,
  Chats,
  ChatsCircle,
  CheckSquare,
  Gear,
  GraduationCap,
  House,
  Newspaper,
  PersonSimpleRun,
} from 'phosphor-react'
import { cn } from '@/core/utils/shadcn-utils'
import NavMenu, { ItemOptionsType } from '@molecules/nav-menu'
import { useLocation } from 'react-router-dom'
import { useLocales } from '@/core/hooks'

export type NavigationBarProps = HTMLAttributes<HTMLDivElement> & {
  items?: ItemOptionsType[]
}

export const ParentNavigationBar: FC<NavigationBarProps> = (props) => {
  const { t } = useLocales()

  const MENU: ItemOptionsType[] = useMemo(
    () => [
      {
        key: 'home',
        label: t('components.menu.dashboard'),
        path: '/dashboard',
        icon: <House size={30} />,
      },
      {
        key: 'news',
        label: t('components.menu.news_events'),
        path: '/news',
        icon: <Newspaper size={30} />,
      },
      {
        key: 'chat',
        label: t('components.menu.chat'),
        path: '/chat',
        icon: <ChatsCircle size={30} />,
        disabled: true,
      },
      {
        key: 'settings',
        label: t('components.menu.settings'),
        path: '/settings',
        icon: <Gear size={30} />,
      },
    ],
    [t],
  )

  return <NavigationBar items={MENU} {...props} />
}

export const TeacherNavigationBar: FC<NavigationBarProps> = (props) => {
  const { t } = useLocales()
  const MENU: ItemOptionsType[] = useMemo(
    () => [
      {
        key: 'home',
        label: t('components.menu.dashboard'),
        path: '/teacher/dashboard',
        icon: <House size={30} />,
      },
      {
        key: 'news',
        label: t('components.menu.news_events'),
        path: '/teacher/news',
        icon: <Newspaper size={25} />,
      },
      {
        key: 'Activities',
        label: t('components.menu.activities'),
        path: '/teacher/activities',
        icon: <PersonSimpleRun size={25} />,
      },
      // {
      //   key: 'attendance',
      //   label: t('components.menu.attendance'),
      //   path: '/teacher/attendance',
      //   icon: <CheckSquare size={25} />,
      // },
      {
        key: 'settings',
        label: t('components.menu.settings'),
        path: '/teacher/settings',
        icon: <Gear size={25} />,
      },
    ],
    [t],
  )
  return <NavigationBar items={MENU} {...props} />
}

export const NavigationBar: FC<NavigationBarProps> = ({ items, className }) => {
  const location = useLocation()

  return (
    <div
      className={cn(
        'z-10 flex w-full border border-t bg-background shadow-sm',
        className,
      )}
    >
      <div className="m-auto max-w-2xl">
        <NavMenu
          className="w-full justify-around gap-5"
          items={items || []}
          active={(item) =>
            item.path ? location.pathname.includes(item.path) : false
          }
          activeClassName={{
            text: 'text-brand-secondary',
            background: 'rounded-none',
          }}
          mode="horizontal"
          itemDirection="vertical"
        />
      </div>
    </div>
  )
}
