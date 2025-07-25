import { useResponsive } from '@/core/hooks'
import { cn } from '@/core/utils/shadcn-utils'
import HeaderPage from '@features/navigation/header-page'
import TopBar from '@features/navigation/top-bar'
import React, {
  Children,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from 'react'

type Props = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    titlePage?: string
    containerFluid?: boolean
  }

export default function ContentPageLayout({
  className,
  children,
  titlePage,
  containerFluid = false,
}: Props) {
  const { isDesktop } = useResponsive()

  return (
    <div className={cn('flex  flex-col')}>
      {isDesktop && <HeaderPage title={titlePage} />}
      {!isDesktop && (
        <TopBar title={titlePage} className="sticky left-0 top-0 z-50" />
      )}
      <div
        className={cn(
          'flex-1',
          {
            'animate-fade-in px-5 py-5 md:container md:py-10': !containerFluid,
          },
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}
