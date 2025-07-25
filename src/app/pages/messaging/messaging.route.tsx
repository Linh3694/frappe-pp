import { RouteObject } from 'react-router-dom'
import { ChannelRedirect } from './components/channel/channel-redirect'

export const MESSAGING_ROUTES: RouteObject = {
  lazy: () => import("./page"),
  children: [
    {
      path: "",
      index: true,
      element: <ChannelRedirect />,
      // element: <>haha</>
    },
    {
      path: ':channelID',
      lazy: () => import('@/app/pages/messaging/components/chat-space/chat-space'),
    },
  ],
}
