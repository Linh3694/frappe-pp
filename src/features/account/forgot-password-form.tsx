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
import { useLocales } from '@/core/hooks'

type Props = HTMLAttributes<HTMLDivElement> & {}

export default function ForgotPasswordForm({ className }: Props) {
  const { t } = useLocales()
  const [alert, setAlert] = useState<AlertContentType>()

  const handleSuccess = () => {
    setAlert({
      type: 'success',
      message: 'Mail sent!',
      desc: 'The link has been sent to your mail.',
    })
  }

  const { form, error, handleSubmit } = useForgotPassword(handleSuccess)

  useEffect(() => {
    if (error?.message) {
      setAlert({
        type: 'error',
        message: 'Something wrong!',
        desc: error.message,
      })
    }
  }, [JSON.stringify(error)])

  return (
    <div className={clsx('flex max-w-full flex-col gap-2', className)}>
      <h4 className="mb-1 text-xl font-semibold">
        {t('common.forgot_password_question')}
      </h4>
      <p className="mb-5 text-xs text-muted-foreground">
        {t('common.forgot_password_meta')}
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
            name="email"
            render={({ field, formState: { isSubmitting } }) => (
              <FormItem>
                <FormLabel htmlFor="input-email">
                  <span>{t('components.inputs.email.label')}</span>
                  <span className="ml-0.5 text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="input-email"
                    disabled={isSubmitting}
                    placeholder={t('components.inputs.email.placeholder')}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          {error && <p className="text-xs text-destructive">{error.message}</p>}
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>{t('components.buttons.send_mail')}</span>
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
