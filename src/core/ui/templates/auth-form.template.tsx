import env from '@/config/env'
import { useResponsive } from '@/core/hooks'
import { cn } from '@/core/utils/shadcn-utils'
import { useTheme } from '@/lib/shadcn/theme-provider'
import { cleanPath } from '@/lib/utils/common'
import {
  LanguageSwitcher,
  LanguageTabSwitcher,
} from '@features/preferences/language-switcher'
import clsx from 'clsx'
import React, { HTMLAttributes, ReactNode } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
  logo?: ReactNode
  tileForm?: ReactNode
  heading?: ReactNode
  desc?: ReactNode
  form?: ReactNode
  bottom?: ReactNode
}

export const AuthFormTemplate = ({ className, logo, form }: Props) => {
  return (
    <div
      className={clsx(
        'flex h-full w-full flex-1 flex-col px-2 lg:px-0',
        className,
      )}
    >
      <div className="m-auto flex w-72 max-w-full flex-col gap-2">
        {logo && <div className="px-5">{logo}</div>}
        {form}
      </div>
    </div>
  )
}

export const AuthFormTemplate2 = ({ className, logo, form }: Props) => {
  const { theme } = useTheme()
  const { isDesktop } = useResponsive()
  return (
    <div
      className={clsx(
        'flex h-full w-full flex-1 flex-col px-2 lg:px-0',
        className,
      )}
    >
      <div
        className={cn(
          'm-auto flex w-[480px] max-w-full overflow-hidden rounded-2xl bg-card sm:w-[1024px]',
          {
            'shadow-2xl shadow-slate-300': isDesktop,
          },
        )}
      >
        <div
          className={cn(
            'hidden basis-1/2 flex-col items-center justify-center bg-white p-10 sm:flex',
            { 'bg-card-foreground': theme === 'dark' },
          )}
        >
          <div className="flex flex-col gap-5">
            <img src={cleanPath(`${env.ASSET_URL}${`/static/welcome.png`}`)} />
            <img
              src={cleanPath(
                `${env.ASSET_URL}${`/static/school_wssg_final_2.png`}`,
              )}
            />
          </div>
        </div>
        {/* {logo && <div className="px-5">{logo}</div>} */}
        <div
          className={cn(
            'lg:py-18 flex flex-col gap-5 p-8 pb-20 sm:basis-1/2 sm:p-10 lg:px-20',
            { 'bg-primary': theme === 'light' },
          )}
        >
          <div className="flex flex-col">
            {logo && <div className="px-5">{logo}</div>}
            <p className="text-center text-xl md:text-2xl font-thin tracking-[8px] uppercase text-brand-orange">
              Parent Portal
            </p>
          </div>
          {form}
        </div>
      </div>
    </div>
  )
}

export const AuthFormTemplate3 = ({ className, logo, form }: Props) => {
  const { theme } = useTheme()
  const { isDesktop } = useResponsive()
  return (
    <div className={cn('h-full w-full p-[3vw] lg:w-auto', className)}>
      <div
        className={cn(
          'm-auto h-full max-w-full overflow-hidden rounded-2xl bg-card lg:flex lg:shadow-xl lg:shadow-slate-300',
          {
            '': isDesktop,
          },
        )}
      >
        <div
          className={cn(
            'hidden basis-[40%] flex-col items-center justify-center bg-primary p-[5%] lg:flex',

            { 'bg-primary': theme === 'light' },
          )}
        >
          <div className="flex flex-col gap-5">
            <img
              src={cleanPath(
                `${env.ASSET_URL}${`/static/welcome_foreground.png`}`,
              )}
            />
            <img
              src={cleanPath(
                `${env.ASSET_URL}${`/static/school_wssg_final.png`}`,
              )}
            />
          </div>
        </div>
        {/* {logo && <div className="px-5">{logo}</div>} */}
        <div
          className={cn('h-full px-3 py-5 sm:basis-[60%] sm:px-10 sm:py-5', {
            'bg-card-foreground': theme === 'dark',
          })}
        >
          <div className="h-full">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between">
                <div className="h-16 text-left">{logo && logo}</div>
                <span className="flex items-center">
                  <LanguageTabSwitcher />
                </span>
              </div>
              <div className="flex-1 overflow-hidden">{form}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
