import clsx from 'clsx'
import React, { HTMLAttributes, ReactNode, useEffect, useState } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@atoms/form'
import { Input } from '@atoms/input'
import { Button } from '@atoms/button'
import { Loader2 } from 'lucide-react'
import AlertStatus, { AlertContentType } from '@molecules/alert-status'
import useForgotPassword from './hooks/use-forgot-password'
import { Link } from 'react-router-dom'
import { useSignIn } from './hooks/use-sign-in'
import { useLocales } from '@/core/hooks'
import { InputPassword } from '@molecules/input-password'

type Props = HTMLAttributes<HTMLDivElement> & {}

export default function SignInForm({ className }: Props) {
  const { t } = useLocales()
  const [alert, setAlert] = useState<AlertContentType>()

  const { form, error, handleSubmit } = useSignIn()

  // useEffect(() => {
  //   if (error?.message) {
  //     setAlert({
  //       type: 'error',
  //       message: 'Something wrong!',
  //       desc: error.message,
  //     })
  //   }
  // }, [JSON.stringify(error)])

  return (
    <div className={clsx('max-w-full', className)}>
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field, formState: { isSubmitting } }) => (
              <FormItem>
                <FormLabel htmlFor="input-email" className="text-white">
                  {t('components.inputs.email.label')}
                  <span className="ml-0.5 text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="input-email"
                    className="border-white/20  text-white"
                    disabled={isSubmitting}
                    autoCapitalize="none"
                    placeholder={t('components.inputs.email.placeholder')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, formState: { isSubmitting } }) => (
              <FormItem>
                <FormLabel htmlFor="input-password" className="text-white">
                  {t('components.inputs.password.label')}
                  <span className="ml-0.5 text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  {/* <Input
                    {...field}
                    id="input-password"
                    required
                    disabled={isSubmitting}
                    placeholder={t('components.inputs.password.placeholder')}
                    type="password"
                  /> */}
                  <InputPassword
                    id="input-password"
                    className="border-white/20 text-white"
                    disabled={isSubmitting}
                    placeholder={t('components.inputs.password.placeholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <p className="text-destructive">{t('components.notification.sign_in_failed.description')}</p>}
          <div className="">
            <Link
              className="text-sm text-white hover:text-brand-orange"
              to="/auth/forgot-password"
            >
              {t('components.links.forgot_password')}
            </Link>
          </div>
          <Button
            className="bg-brand-orange font-bold  uppercase text-white hover:bg-brand-orange/90"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {t('components.buttons.sign_in')}
          </Button>
          <center>
            <span className="mr-2 text-sm font-bold text-white">
              {t('components.links.register')}
            </span>
            <Link
              className="text-sm font-bold text-brand-orange underline  hover:text-brand-orange/90"
              to="/auth/registration"
            >
              {t('components.buttons.sign_up')}
            </Link>
          </center>
        </form>
      </Form>
    </div>
  )
}
