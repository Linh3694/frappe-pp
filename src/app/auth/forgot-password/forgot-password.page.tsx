import { useState, useContext } from 'react'
import Logo from '@atoms/logo'
import ForgotPasswordForm from '@features/account/forgot-password-form'
import { AuthFormTemplate } from '@templates/auth-form.template'

export const Component = () => {
  return (
    <AuthFormTemplate
      logo={<Logo />}
      form={<ForgotPasswordForm />}
    />
  )
}

Component.displayName = 'ForgotPasswordPage'
