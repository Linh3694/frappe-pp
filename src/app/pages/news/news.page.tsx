import { useState, type FC } from 'react'
import { Permission } from '@/core/utils/permission'
import { createPage } from '@/core/utils/route-guard'
import { useLocales, useResponsive } from '@/core/hooks'
import ForbiddenState from '@features/states/forbbiden-state'
import ContentPageLayout from '@templates/content-page.layout'
import NewsPageTemplate from '@templates/news-page.template'
import TopNewsSlider from '@features/news/top-news-slider'
import NewsList from '@features/news/news-list'
const PERMISSIONS: Permission[] = []
const DISPLAY_NAME = 'News'

export const Route: FC = () => {
  const {t} = useLocales()
  const { isDesktop } = useResponsive()

  return (
    <ContentPageLayout titlePage={t('components.menu.news_events')}>
      <NewsPageTemplate slider={<TopNewsSlider />} list={<NewsList />} />
    </ContentPageLayout>
  )
}

const Component = createPage(Route, PERMISSIONS, <ForbiddenState />)

Route.displayName = `${DISPLAY_NAME}Page`
Component.displayName = DISPLAY_NAME

export { Component }
