import { useResponsive } from '@/core/hooks'
import clsx from 'clsx'
import React, { HTMLAttributes, ReactNode } from 'react'
import ContentPageLayout from './content-page.layout'

type Props = HTMLAttributes<HTMLDivElement> & {
  title?: string
  article?: ReactNode
}

export default function PostDetailPageTemplate({
  className,
  title,
  article,
}: Props) {
  const { isDesktop } = useResponsive()
  return <div className="sm:mt-10">{article}</div>
}
