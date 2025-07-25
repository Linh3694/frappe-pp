import { useState, useContext } from 'react'
import Logo from '@atoms/logo'
import ResetPasswordForm from '@features/account/reset-password.form'
import { AuthFormTemplate } from '@templates/auth-form.template'

export const Component = () => {
  return <AuthFormTemplate logo={<Logo />} form={<ResetPasswordForm />} />
}

Component.displayName = 'ResetPasswordPage'
