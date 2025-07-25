import { useCallback, useContext, type FC } from 'react'
import { AuthContext } from '@/lib/auth/auth-provider'
import { Permission } from '@/core/utils/permission'
import { createPage } from '@/core/utils/route-guard'
import ForbiddenState from '@features/states/forbbiden-state'
import SettingsPageTemplate from '@templates/settings.page.template'
import ContentPageLayout from '@templates/content-page.layout'
import LogOut from '@features/account-setting/logout'
import { ProfileSettings } from '@features/account-setting/profile-settings'
import { SecuritySettings } from '@features/account-setting/securitySettings'
import { AppearanceSettings } from '@features/account-setting/appearance-settings'

const PERMISSIONS: Permission[] = []
const DISPLAY_NAME = 'Settings'

export const Route: FC = () => {
  return (
    <ContentPageLayout>
      <SettingsPageTemplate
        profileSettings={<ProfileSettings />}
        securitySettings={<SecuritySettings />}
        appearanceSettings={<AppearanceSettings />}
      />
    </ContentPageLayout>
  )
}

const Component = createPage(Route, PERMISSIONS, <ForbiddenState />)

Route.displayName = `${DISPLAY_NAME}Page`
Component.displayName = DISPLAY_NAME

export { Component }
