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
import { Link } from 'react-router-dom'
import { Button } from '@atoms/button'
import { Loader2 } from 'lucide-react'
import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core'
import { Progress } from '@atoms/progress'
import PasswordLevel from '@molecules/password-level'
import AlertStatus, { AlertContentType } from '@molecules/alert-status'
import { PasswordLevelsConfig } from '@/config/app'
import useResetPassword from './hooks/use-reset-password'
import { useLocales } from '@/core/hooks'

type Props = HTMLAttributes<HTMLDivElement> & {}

export default function ResetPasswordForm({ className }: Props) {
  const { t } = useLocales()
  const [alert, setAlert] = useState<AlertContentType>()

  const handleSuccess = () => {
    setAlert({
      type: 'success',
      message: 'Password updated!',
      desc: (
        <span>
          Your password has been updated.
          <Link to={'/'} className="underline">
            Go home
          </Link>
        </span>
      ),
    })
  }

  const { form, level, totalLevel, error, handleSubmit } =
    useResetPassword(handleSuccess)

  useEffect(() => {
    if (error?.message) {
      setAlert({
        type: 'error',
        message: 'Failure!',
        desc: error.message,
      })
    }
  }, [JSON.stringify(error)])

  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      <h4 className="mb-1 text-xl font-semibold">
        {t('common.reset_password')}
      </h4>
      <p className="mb-5 text-xs text-muted-foreground">
        {t('common.reset_password_meta')}
      </p>
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <AlertStatus
            message={alert?.message}
            desc={alert?.desc}
            type={alert?.type}
          />
          <FormField
            control={form.control}
            name="new_password"
            render={({ field, formState: { isSubmitting } }) => (
              <FormItem>
                <FormLabel
                  htmlFor="input-new-password"
                  className="mb-3 flex justify-between"
                >
                  <span>
                    <span> {t('components.inputs.new_password.label')}</span>
                    <span className="ml-0.5 text-red-500">*</span>
                  </span>
                  <PasswordLevel
                    value={level}
                    config={PasswordLevelsConfig}
                    className="w-[50%]"
                  />
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="input-new-password"
                    type="password"
                    disabled={isSubmitting}
                    placeholder={t(
                      'components.inputs.new_password.placeholder',
                    )}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="re_password"
            render={({ field, formState: { isSubmitting } }) => (
              <FormItem>
                <FormLabel htmlFor="input-re-password" className="mb-3">
                  <span>{t('components.inputs.re_password.label')}</span>
                  <span className="ml-0.5 text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="input-re-password"
                    type="password"
                    disabled={isSubmitting}
                    placeholder={t('components.inputs.re_password.placeholder')}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          {/* {error && <p className="text-xs text-destructive">{form.}</p>} */}
          {/* {error && <p className="text-xs text-destructive">{error.message}</p>} */}
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>{t('components.buttons.reset')}</span>
          </Button>
        </form>
      </Form>
      <center>
        <Link className="text-sm text-brand-secondary" to="/auth/login">
          {t('components.buttons.back_to_login')}
        </Link>
      </center>
    </div>
  )
}
