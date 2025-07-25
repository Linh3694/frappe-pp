import clsx from 'clsx'
import React, { Fragment, HTMLAttributes, ReactNode, useContext } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@atoms/avatar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@atoms/breadcrumb'
import { House } from 'phosphor-react'
import { capitalize } from 'lodash'
import { useLocation } from 'react-router-dom'
import { Slash } from 'lucide-react'
import { AuthContext, useAuthContext } from '@/lib/auth/auth-provider'
import { genAvatarDefault, getInitials } from '@/lib/utils/common'
import { Separator } from '@atoms/separator'
import { LanguageSwitcher } from '@features/preferences/language-switcher'
import { AccountDropdownMenu } from '@features/account-setting/account-dropdown-menu'
import routes from '@/config/routes'
import { useLocales } from '@/core/hooks'

type Props = HTMLAttributes<HTMLDivElement> & {
  title?: string
  subtitle?: string
  //   actions?: ReactNode
}

export default function HeaderPage({ className, title }: Props) {
  const { t } = useLocales()
  const { pathname } = useLocation()
  const paths = pathname.split('/').filter((i) => i)
  const { currentUser, userInfo } = useAuthContext()

  // console.log(currentUser)

  return (
    <div
      className={clsx(
        'sticky top-0 z-50 w-full gap-10 border-b bg-card py-2',
        className,
      )}
    >
      <div className="flex justify-between px-10">
        <div className="flex flex-1 flex-col">
          <Breadcrumb>
            <BreadcrumbList className="flex-nowrap">
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={routes.page(
                    `/`,
                  )}
                >
                  <p className="line-clamp-1 text-xs font-medium hover:text-brand-secondary">
                    {t(`components.menu.home`)}
                  </p>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {paths.length === 0 && (
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
              )}
              {paths.map((path, index) => (
                <Fragment key={path}>
                  <BreadcrumbSeparator>/</BreadcrumbSeparator>
                  <BreadcrumbItem>
                    {(index !== paths.length - 1 && (
                      <BreadcrumbLink
                        href={routes.page(
                          `/${[...paths].splice(0, index + 1).join('/')}`,
                        )}
                      >
                        <p className="line-clamp-1 max-w-[200px] text-xs font-medium hover:text-brand-secondary">
                          {title && index === paths.length - 1
                            ? title
                            : capitalize(t(`components.menu.${path}`))}
                        </p>
                      </BreadcrumbLink>
                    )) || (
                      <p className="line-clamp-1 max-w-[200px] text-xs font-medium">
                        {title && index === paths.length - 1
                          ? title
                          : capitalize(t(`components.menu.${path}`))}
                      </p>
                    )}
                  </BreadcrumbItem>
                </Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="line-clamp-1 scroll-m-20 text-lg font-bold capitalize text-brand-secondary">
            {title ||
              capitalize(
                t(
                  `components.menu.${paths[paths.length - 1].replaceAll('-', ' ')}`,
                ),
              )}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <LanguageSwitcher
            // variant="icon"
            />
            <Separator orientation="vertical" className="h-6" />
          </div>
          <div className="flex flex-col items-end ">
            <p className=" text-xs text-muted-foreground ">
              {t('common.welcome_back')},
            </p>
            <p className=" text-xs font-semibold text-brand-secondary">
              {userInfo?.full_name || 'Anonymous'}
            </p>
          </div>
          <AccountDropdownMenu>
            <Avatar className="h-9 w-9 border bg-card-foreground">
              <AvatarImage
                className="object-cover"
                src={userInfo?.avatar || genAvatarDefault(userInfo?.full_name)}
              />
              <AvatarFallback className="bg-brand-secondary text-xs font-light text-white">
                {getInitials(userInfo?.full_name || 'Anonymous')}
              </AvatarFallback>
            </Avatar>
          </AccountDropdownMenu>
        </div>
      </div>
    </div>
  )
}
