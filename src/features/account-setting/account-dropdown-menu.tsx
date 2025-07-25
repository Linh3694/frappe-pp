import { HTMLAttributes, PropsWithChildren, useCallback, type FC } from 'react'
import { cn } from '@/core/utils/shadcn-utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@atoms/dropdown-menu'
import { useAuthContext } from '@/lib/auth/auth-provider'
import { Avatar, AvatarFallback, AvatarImage } from '@atoms/avatar'
import { cleanPath, genAvatarDefault, getInitials } from '@/lib/utils/common'
import { Languages, LogOut, Moon, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Switch } from '@atoms/switch'
import { LanguageSwitcher } from '@features/preferences/language-switcher'
import { ThemeSwitcher } from '@features/preferences/theme-switcher'
import { useLocales } from '@/core/hooks'

export type AccountDropdownMenuProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {}

export const AccountDropdownMenu: FC<AccountDropdownMenuProps> = ({
  className,
  children,
}) => {
  const { t } = useLocales()
  const { currentUser, userInfo, prefixRoute, logout } = useAuthContext()

  const handleLogout = useCallback(async () => {
    try {
      await logout()
      // window.location.replace('/auth')
    } catch {
      // TODO: Handle error
    }
  }, [])
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-0">
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex gap-4 p-2">
          <Avatar className="h-10 w-10 border bg-card-foreground">
            <AvatarImage
              className="object-cover"
              src={userInfo?.avatar || genAvatarDefault(userInfo?.full_name)}
            />
            <AvatarFallback className="bg-brand-secondary text-xs font-light text-white">
              {getInitials(userInfo?.full_name || 'Anonymous')}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="m-0 text-sm">{userInfo?.full_name}</p>
            <p className="m-0 text-xs text-muted-foreground">
              {userInfo?.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Link
            className="flex w-full items-center"
            to={cleanPath(`/${prefixRoute}/settings/`)}
          >
            <User className="mr-2 h-4 w-4" />{' '}
            <span>{t('components.menu.profile')}</span>
          </Link>
        </DropdownMenuItem>
        <div className="rounded-md p-2 text-sm hover:bg-accent">
          <div className="flex w-full justify-between">
            <div className="flex items-center">
              <Languages className="mr-2 h-4 w-4" />{' '}
              <span>{t('components.menu.translate')}</span>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
        <div className="rounded-md p-2 text-sm hover:bg-accent">
          <div className="flex w-full justify-between">
            <div className="flex items-center">
              <Moon className="mr-2 h-4 w-4" />{' '}
              <span>{t('components.menu.dark_mode')}</span>
            </div>
            <ThemeSwitcher />
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />{' '}
          <span>{t('components.menu.logout')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
