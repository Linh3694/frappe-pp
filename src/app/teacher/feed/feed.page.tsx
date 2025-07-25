import { useState, type FC } from 'react'
import { Permission } from '@/core/utils/permission'
import { createPage } from '@/core/utils/route-guard'
import { useLocales, useResponsive } from '@/core/hooks'
import moment from 'moment'
import ForbiddenState from '@features/states/forbbiden-state'
import FeedTabs from '@features/feed/feed-tabs'
import FeedPageTemplate from '@templates/feed-page.template'
import clsx from 'clsx'
import ContentPageLayout from '@templates/content-page.layout'
import FeedInfiniteScroll from '@features/feed/feed-infinite-scroll'
import AddFeedButton from '@features/feed/add-feed-button'

const PERMISSIONS: Permission[] = []
const DISPLAY_NAME = 'Feed'

export const Route: FC = () => {
  const {t} = useLocales()
  const { isDesktop } = useResponsive()

  return (
    <ContentPageLayout titlePage={t('components.menu.activities')}>
      <FeedPageTemplate
        list={<FeedInfiniteScroll isManager={true}/>}
      />
    </ContentPageLayout>
  )
}

const Component = createPage(Route, PERMISSIONS, <ForbiddenState />)

Route.displayName = `${DISPLAY_NAME}Page`
Component.displayName = DISPLAY_NAME

export { Component }
