import clsx from 'clsx'
import React, { FC, HTMLAttributes, useMemo } from 'react'
import Logo from '@atoms/logo'
import { Button } from '@atoms/button'
import {
  Chats,
  ChatsCircle,
  Hamburger,
  PersonSimpleRun,
  Student,
} from 'phosphor-react'
import { ListStart, MenuIcon } from 'lucide-react'
import { StudentsSwitcherModal } from '@features/student/student-switcher-modal'
import UserProfileCard from '@molecules/user-profile-card'
import { Separator } from '@atoms/separator'
import NavMenu, { ItemOptionsType } from '@molecules/nav-menu'
import {
  Bell,
  BookOpen,
  Bus,
  Calendar,
  Chat,
  CheckSquare,
  ForkKnife,
  Gear,
  Heart,
  House,
  Newspaper,
  NotePencil,
  SquaresFour,
} from 'phosphor-react'
import { ScrollArea } from '@atoms/scroll-area'
import { StudentCard } from '@features/student/student-card'
import { cn } from '@/core/utils/shadcn-utils'
import { Link, useLocation } from 'react-router-dom'
import { useLocales } from '@/core/hooks'
import styled from 'styled-components'
import { useTheme } from '@/lib/shadcn/theme-provider'
import { useTeacher } from '@/lib/teacher/teacher-provider'
import { useChildren } from '@/lib/student/children-provider'
import { Badge } from '@atoms/badge'

const ScrollAreaStyled = styled(ScrollArea)`
  & > div > div {
    height: 100%;
  }
`
export type SideBarProps = HTMLAttributes<HTMLDivElement> & {
  mainMenu?: ItemOptionsType[]
  bottomMenu?: ItemOptionsType[]
}

export const ParentSideBar: FC<SideBarProps> = (props) => {
  const { t } = useLocales()

  const MAIN_MENU: ItemOptionsType[] = useMemo(
    () => [
      {
        key: 'dashboard',
        label: t('components.menu.dashboard'),
        path: '/dashboard',
        icon: (
          <SquaresFour
            size={20}
            weight={'regular'}
            className="text-brand-secondary"
          />
        ),
      },
      {
        key: 'news',
        label: t('components.menu.news_events'),
        path: '/news',
        icon: (
          <Newspaper
            size={20}
            weight={'regular'}
            className="text-brand-secondary"
          />
        ),
      },
      {
        key: 'activities',
        label: t('components.menu.activities'),
        path: '/activities',
        icon: (
          <PersonSimpleRun
            size={20}
            weight={'regular'}
            className="text-brand-secondary"
          />
        ),
      },
      {
        key: 'chat',
        label: t('components.menu.chat'),
        path: '/messaging',
        icon: (
          <ChatsCircle
            size={20}
            weight={'regular'}
            className="text-brand-secondary"
          />
        ),
        disabled: true,
      },
      {
        key: 'sm',
        label: t('student_management'),
        type: 'group',
        children: [
          {
            key: 'timetable',
            label: t('components.menu.timetable'),
            path: '/student/timetable',
            icon: (
              <Calendar
                size={20}
                weight={'regular'}
                className="text-brand-secondary"
              />
            ),
          },
          {
            key: 'attendance',
            label: t('components.menu.attendance'),
            path: '/student/attendance',
            icon: (
              <CheckSquare
                size={20}
                weight={'regular'}
                className="text-brand-secondary"
              />
            ),
          },
          {
            key: 'leave-request',
            label: t('components.menu.leave_request'),
            path: '/forms/leave-request',
            icon: (
              <NotePencil
                size={20}
                weight={'regular'}
                className="text-brand-secondary"
              />
            ),
            disabled: true,
          },
          {
            key: 'grades',
            label: t('components.menu.grades'),
            path: '/student/grades',
            icon: (
              <BookOpen
                size={20}
                weight={'regular'}
                className="text-brand-secondary"
              />
            ),
            disabled: true,
          },
          {
            key: 'health',
            label: t('components.menu.health'),
            path: '/student/health',
            icon: (
              <Heart
                size={20}
                weight={'regular'}
                className="text-brand-secondary"
              />
            ),
            disabled: true,
          },
          {
            key: 'bus',
            label: t('components.menu.bus'),
            path: '/student/bus',
            icon: (
              <Bus
                size={20}
                weight={'regular'}
                className="text-brand-secondary"
              />
            ),
            disabled: true,
          },
          {
            key: 'food_menu',
            label: t('components.menu.food_menu'),
            path: '/student/food_menu',
            icon: (
              <ForkKnife
                size={20}
                weight={'regular'}
                className="text-brand-secondary"
              />
            ),
            disabled: true,
          }
        ],
      },
    ],
    [t],
  )
  const SYSTEM_MENU: ItemOptionsType[] = useMemo(
    () => [
      {
        key: 'notifications',
        label: t('components.menu.notifications'),
        path: '/notifications',
        icon: (
          <Bell size={20} weight={'regular'} className="text-brand-secondary" />
        ),
        disabled: true,
      },
      {
        key: 'settings',
        label: t('components.menu.settings'),
        path: '/settings',
        icon: (
          <Gear size={20} weight={'regular'} className="text-brand-secondary" />
        ),
      },
    ],
    [t],
  )
  return <SideBar mainMenu={MAIN_MENU} bottomMenu={SYSTEM_MENU} {...props} />
}

export const TeacherSideBar: FC<SideBarProps> = (props) => {
  const { t } = useLocales()
  const MAIN_MENU: ItemOptionsType[] = useMemo(
    () => [
      {
        key: 'Dashboard',
        label: t('components.menu.dashboard'),
        path: '/teacher/dashboard',
        icon: (
          <House
            size={25}
            weight={'regular'}
            className="text-brand-secondary"
          />
        ),
      },
      {
        key: 'News',
        label: t('components.menu.news_events'),
        path: '/teacher/news',
        icon: (
          <Newspaper
            size={25}
            weight={'regular'}
            className="text-brand-secondary"
          />
        ),
      },
      {
        key: 'Activities',
        label: t('components.menu.activities'),
        path: '/teacher/activities',
        icon: (
          <PersonSimpleRun
            size={25}
            weight={'regular'}
            className="text-brand-secondary"
          />
        ),
      },
      {
        key: 'timetable',
        label: t('components.menu.timetable'),
        path: '/teacher/timetable',
        icon: (
          <Calendar
            size={25}
            weight={'regular'}
            className="text-brand-secondary"
          />
        ),
      },
      {
        key: 'attendance',
        label: t('components.menu.attendance'),
        path: '/teacher/attendance',
        icon: (
          <CheckSquare
            size={25}
            weight={'regular'}
            className="text-brand-secondary"
          />
        ),
      },
    ],
    [t],
  )

  const SYSTEM_MENU: ItemOptionsType[] = useMemo(
    () => [
      {
        key: 'settings',
        label: t('components.menu.settings'),
        path: `/teacher/settings`,
        icon: (
          <Gear size={25} weight={'regular'} className="text-brand-secondary" />
        ),
      },
    ],
    [t],
  )
  return <SideBar mainMenu={MAIN_MENU} bottomMenu={SYSTEM_MENU} {...props} />
}

export const SideBar: FC<SideBarProps> = ({
  mainMenu,
  bottomMenu,
  className,
}) => {
  const { current } = useChildren()
  const location = useLocation()
  const { theme } = useTheme()

  return (
    <div
      className={cn(
        'sticky left-0 top-0 h-screen basis-[256px] border-r bg-card ',
        className,
      )}
    >
      <ScrollAreaStyled className="h-screen">
        <div className="flex h-full flex-col justify-between px-4 py-2">
          <div className="flex h-full flex-col">
            <div className="relative">
              <Link to="/">
                <Logo
                  className="mx-auto mb-5 h-auto w-full max-w-[120px]"
                  variant={theme === 'dark' ? 'white' : 'default'}
                />
              </Link>
            </div>
            {current && (
              <>
                <StudentCard size="small" />
                <Separator className="my-2" />
              </>
            )}
            {mainMenu && (
              <NavMenu
                items={mainMenu}
                active={(item) =>
                  item.path ? location.pathname.includes(item.path) : false
                }
                activeClassName={{
                  text: 'text-white',
                  background:
                    '[background:linear-gradient(269.28deg,#009684_0%,#006882_98.08%)] shadow-md',
                }}
              />
            )}
          </div>
          {bottomMenu && (
            <NavMenu
              className="my-2"
              items={bottomMenu}
              active={(item) =>
                item.path ? location.pathname.includes(item.path) : false
              }
              activeClassName={{
                text: 'text-white',
                background:
                  '[background:linear-gradient(269.28deg,#009684_0%,#006882_98.08%)] shadow-md',
              }}
            />
          )}
        </div>
      </ScrollAreaStyled>
    </div>
  )
}
