import React, { HTMLAttributes, ReactNode, memo } from 'react'
import { useResponsive } from '@/core/hooks'
import { cn } from '@/core/utils/shadcn-utils'

type Props = {
  className?: string
  list?: ReactNode
}

const FeedPageTemplate = ({ className, list }: Props) => {
  const { isDesktop } = useResponsive()
  return (
    <div className={cn('mx-auto max-w-xl ', className)}>
      {list}
    </div>
  )
}

export default memo(FeedPageTemplate)
