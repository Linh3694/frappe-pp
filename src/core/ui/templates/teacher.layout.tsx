import { useResponsive } from '@/core/hooks'
import clsx from 'clsx'
import React, {
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
} from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ScrollArea } from '@atoms/scroll-area'
import { Toaster } from '@atoms/toaster'
import styled from 'styled-components'

type Props = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    sidebar?: ReactNode
    bottom?: ReactNode
  }

const ScrollAreaStyled = styled.div`
  & {
    scrollbar-width: thin;
  }
  /* & > div > div {
    height: 100%;
  } */
`

export default function TeacherLayout({
  className,
  children,
  sidebar,
  bottom,
}: Props) {
  const location = useLocation()
  const { isDesktop } = useResponsive()
  const { pathname } = useLocation()
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className={clsx(
        'relative flex h-screen flex-col bg-slate-100/50 md:flex-row',
        className,
      )}
    >
      {isDesktop && sidebar}

      <div className="flex-1 overflow-hidden">
        <ScrollAreaStyled
          ref={contentRef}
          className="flex h-full flex-col gap-5 overflow-x-hidden"
        >
          {children}
        </ScrollAreaStyled>
      </div>
      {/* {children} */}
      <Toaster />

      {!isDesktop && bottom}
    </div>
  )
}
