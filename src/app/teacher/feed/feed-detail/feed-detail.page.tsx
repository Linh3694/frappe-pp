import type { FC } from 'react'

import { Permission } from '@/core/utils/permission'
import { createPage } from '@/core/utils/route-guard'
import { feed } from '@/mock-data/feeds.json'
import ForbiddenState from '@features/states/forbbiden-state'
import FeedItemPage from '@templates/post-detail-page.template'
import { useResponsive } from '@/core/hooks'
import ContentPageLayout from '@templates/content-page.layout'
import PostDetailPageTemplate from '@templates/post-detail-page.template'
import { useParams } from 'react-router-dom'
import { useGetClassFeedById } from '@/api/feed/use-get-class-feed-by-id'
import PostDetail from '@molecules/post-detail'

const PERMISSIONS: Permission[] = []
const DISPLAY_NAME = 'FeedItem'

export const Route: FC = () => {
  const { isDesktop } = useResponsive()
  const { id } = useParams()

  // TODO: If id is not present, return error page
  if (!id) {
    return <div>ERROR PAGE: Feed not found</div>
  }

  const { feed, error, isLoading, isValidating } = useGetClassFeedById(id)
  // console.log(id, feeds)

  return (
    <ContentPageLayout titlePage={isDesktop ? feed?.title : 'Feed'}>
      <PostDetailPageTemplate
        title={feed?.title}
        article={
          <PostDetail
            title={feed?.title}
            thumbnail={(feed?.attachments && feed?.attachments[0]?.file_url) || ''}
            desc={feed?.description}
            pubDate={feed?.public_time}
            content={feed?.content}
          />
        }
      />
    </ContentPageLayout>
  )
}

const Component = createPage(Route, PERMISSIONS, <ForbiddenState />)

Route.displayName = `${DISPLAY_NAME}Page`
Component.displayName = DISPLAY_NAME

export { Component }
