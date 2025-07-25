import React, { HTMLAttributes, ReactNode, memo } from 'react'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { useResponsive } from '@/core/hooks'
import MasonryGalleryTemplate from './masonry-gallery.template'
import { cn } from '@/core/utils/shadcn-utils'
import { useTranslation } from 'react-i18next'

type Props = {
  className?: string
  slider?: ReactNode
  list?: ReactNode
}

const NewsPageTemplate = ({ className, slider, list }: Props) => {
  const { isDesktop } = useResponsive()
  const { t } = useTranslation()
  return (
    <div className={cn('flex flex-col gap-5', className)}>
      <h4 className="scroll-m-20 border-l-4 border-primary pl-3 text-xl font-bold tracking-tight text-primary">
        {t('top_news')}
      </h4>
      {slider}
      <h4 className="scroll-m-20 border-l-4 border-primary pl-3 text-xl font-bold tracking-tight text-primary">
        {t('all_news')}
      </h4>
      {list}
    </div>
  )
}

export default memo(NewsPageTemplate)
