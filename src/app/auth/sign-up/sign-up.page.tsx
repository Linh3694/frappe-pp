import type { FC } from 'react'

import { Permission } from '@/core/utils/permission'
import { createPage } from '@/core/utils/route-guard'
import ForbiddenState from '@features/states/forbbiden-state'
import { AuthFormTemplate3 } from '@templates/auth-form.template'
import Logo from '@atoms/logo'
import { SignUpForm } from '@features/account/sign-up.form'
import { useTheme } from '@/lib/shadcn/theme-provider'

const PERMISSIONS: Permission[] = []
const DISPLAY_NAME = 'SignUp'

export const Route: FC = () => {
  const { theme } = useTheme()
  return (
    <AuthFormTemplate3
      logo={
        <Logo
          variant={theme === 'light' ? 'default' : 'white'}
          className="inline"
        />
      }
      form={<SignUpForm />}
    />
  )
}

const Component = createPage(Route, PERMISSIONS, <ForbiddenState />)

Route.displayName = `${DISPLAY_NAME}Page`
Component.displayName = DISPLAY_NAME

export { Component }
