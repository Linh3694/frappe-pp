import { useState, useContext } from 'react'
import Logo from '@atoms/logo'
import { AuthFormTemplate2 } from '@templates/auth-form.template'
import SignInForm from '@features/account/sign-in-form'
import { useTheme } from '@/lib/shadcn/theme-provider'

export const Component = () => {
  const {theme} = useTheme()
  return (
    <AuthFormTemplate2
      logo={<Logo variant={"white"} />}
      form={<SignInForm />}
    />
  )
}

Component.displayName = 'SignInPage'
