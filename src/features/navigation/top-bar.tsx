import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '@atoms/logo'
import { StudentsSwitcherModal } from '../student/student-switcher-modal'
import NotificationDrawer from '../notification/notification-drawer'
import { Badge } from '@atoms/badge'
import { ArrowLeft, Bell, CaretLeft, Gear } from 'phosphor-react'
import { Avatar, AvatarFallback, AvatarImage } from '@atoms/avatar'
import { ChevronLeft } from 'lucide-react'
import { capitalize } from 'lodash'
import { LanguageSwitcher } from '@features/preferences/language-switcher'
import { cn } from '@/core/utils/shadcn-utils'
import { useChildren } from '@/lib/student/children-provider'
import { useAuthContext } from '@/lib/auth/auth-provider'
import { genAvatarDefault, getInitials } from '@/lib/utils/common'
type Props = {
  className?: string
  title?: string
}

export default function TopBar({ className, title }: Props) {
  const location = useLocation()
  const { currentUser, userInfo } = useAuthContext()
  const { current } = useChildren()
  const isHome = location.pathname.includes('/dashboard')

  return (
    <div
      className={cn(
        '[background:var(--gradient-s-p)]',
        'relative mx-auto w-full px-5 py-2  sm:container sm:px-0',
        className,
      )}
    >
      {/* <div
        className="absolute left-0 top-0 z-0 h-[160%] w-full backdrop-blur-md"
        style={{
          maskImage: 'linear-gradient(rgba(0, 0, 0) 43%, rgb(0, 0, 0, 0) 100%, rgb(0, 0, 0) 50%, rgba(0, 0, 0, 0) 108.5%)',
        }}
      ></div> */}
      <div className="relative z-20 flex h-[50px] items-center justify-between text-white">
        {!isHome && (
          <Link to="/">
            <CaretLeft weight="light" size={30} />
          </Link>
        )}
        {!isHome && (
          <div className="text-xl font-semibold">
            {title
              ? title
              : capitalize(
                  location.pathname.split('/').at(-1)?.replace('-', ' '),
                )}
          </div>
        )}
        {isHome && <Logo className="h-full" variant="white" />}
        <div className="flex gap-2">
          {isHome && (
            <div className="flex items-center gap-4">
              <LanguageSwitcher className="hover:bg-background/10" />
              {/* <NotificationDrawer>
              <div className="relative">
                <Bell
                  size={24}
                  className={cn({ 'fill-white': isHome })}
                  weight="fill"
                />
                <Badge
                  className="absolute -right-1 -top-1 h-4 w-4 rounded-full p-1"
                  variant="destructive"
                >
                  1
                </Badge>
              </div>
            </NotificationDrawer> */}
            </div>
          )}
          {(current && (
            <StudentsSwitcherModal>
              <Avatar className="h-10 w-10 border bg-card-foreground">
                <AvatarImage className="object-cover" src={current.avatar || genAvatarDefault(current.full_name)} />
                <AvatarFallback>
                  {getInitials(current.full_name)}
                </AvatarFallback>
              </Avatar>
            </StudentsSwitcherModal>
          )) || (
            <Avatar className="h-10 w-10 border bg-card-foreground">
              <AvatarImage
                className="object-cover"
                src={userInfo?.avatar || genAvatarDefault(userInfo?.full_name)}
              />
              <AvatarFallback>
                {getInitials(userInfo?.full_name || 'U')}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>
    </div>
  )
}
