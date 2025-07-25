import type { FC } from 'react'

import { Permission } from '@/core/utils/permission'
import { createPage } from '@/core/utils/route-guard'
import { hasParentPortalUserRole, isSystemManager } from '@/lib/utils/roles'

import { UserListProvider } from './context/user-list-provider'
import { ChannelListProvider } from './context/channel-list-provider'
import { ActiveUsersProvider } from './context/active-users-provider'

import { Outlet, useLocation, useParams } from 'react-router-dom'
import { VirtuosoRefProvider } from './context/virtuoso-ref-provider'
import { useStickyState } from './hooks/use-sticky-state'
import { ThemeProvider } from './context/radix-theme-provider'
import '@radix-ui/themes/styles.css'
import { Flex, Box } from '@radix-ui/themes'
import ForbiddenState from '@features/states/forbbiden-state'
import { Sidebar } from './components/chat-sidebar'
import { useResponsive } from '@/core/hooks'
import TopBar from '@features/navigation/top-bar'
import styled from 'styled-components'

const PERMISSIONS: Permission[] = []
const DISPLAY_NAME = 'Messaging'

const ChatWrapper = styled.div`
  height: 100%;
  .radix-themes {
    height: 100%;
  }
`

export const Route: FC = () => {
  const location = useLocation()
  const { isDesktop } = useResponsive()
  const { channelID } = useParams<{ channelID: string }>()

  console.log(channelID)

  const [appearance, setAppearance] = useStickyState<'light' | 'dark'>(
    'light',
    'appearance',
  )

  // turn off toggleTheme for now
  const toggleTheme = () => {
    setAppearance(appearance === 'dark' ? 'light' : 'light')
  }

  // return <ComingSoonState />;
  console.log(hasParentPortalUserRole(), isSystemManager())

  const isParentPortalUser = hasParentPortalUserRole() || isSystemManager()

  if (!isParentPortalUser) {
    return (
      <div className="mx-auto flex flex-1 w-[50vw] items-center justify-center px-4">
        <ForbiddenState />
      </div>
    )
  }

  return (
    <ChatWrapper>
      <UserListProvider>
        <ChannelListProvider>
          <ActiveUsersProvider>
            <ThemeProvider
              appearance={appearance}
              // grayColor='slate'
              accentColor="iris"
              panelBackground="translucent"
              toggleTheme={toggleTheme}
            >
              <div className="flex h-full flex-col">
                {!isDesktop && <TopBar className="fixed" title="Messenger" />}
                <div className="flex max-w-full flex-1 flex-col md:flex-row">
                  {(isDesktop || !channelID) && (
                    <Box
                      className={`pt-[70px] md:pt-0 bg-gray-2 border-r-gray-3 dark:bg-gray-1 md:basis-64 h-full border-r`}
                    >
                      <Sidebar />
                    </Box>
                  )}

                  {(isDesktop || channelID) && (
                    <Box className="dark:bg-gray-2 flex-1 min ">
                      <VirtuosoRefProvider>
                        <Outlet />
                      </VirtuosoRefProvider>
                    </Box>
                  )}
                </div>
              </div>
            </ThemeProvider>
          </ActiveUsersProvider>
        </ChannelListProvider>
      </UserListProvider>
    </ChatWrapper>
  )
}

const Component = createPage(Route, PERMISSIONS, <ForbiddenState />)

Route.displayName = `${DISPLAY_NAME}Page`
Component.displayName = DISPLAY_NAME

export { Component }
