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
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@atoms/button'
import { Loader2 } from 'lucide-react'
import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core'
import { Progress } from '@atoms/progress'
import PasswordLevel from '@molecules/password-level'
import AlertStatus, { AlertContentType } from '@molecules/alert-status'
import useChangePassword from './hooks/use-change-password'
import { useToast } from '@atoms/use-toast'
import { ToastAction } from '@atoms/toast'
import { useRouter } from '@/core/hooks/use-router'
import { useAuthContext } from '@/lib/auth/auth-provider'
import { PasswordLevelsConfig } from '@/config/app'
import { useLocales } from '@/core/hooks'
import { InputPassword } from '@molecules/input-password'

type Props = HTMLAttributes<HTMLDivElement> & {}

export default function ChangePasswordForm({ className }: Props) {
  const { t } = useLocales()
  const navigate = useNavigate()
  const { updateCurrentUser } = useAuthContext()
  const [alert, setAlert] = useState<AlertContentType>()
  const { toast } = useToast()
  const {
    form,
    level,
    totalLevel,
    error,
    handleSubmit: handleChangePassword,
  } = useChangePassword()

  const handleSubmitForm = async (data: any) => {
    try {
      await handleChangePassword(data)
      // toast({
      //   variant: 'default',
      //   title: 'Password updated!',
      //   description: 'Your password has been updated.',
      // })
      setAlert({
        type: 'success',
        message: t('components.notification.password_updated.heading'),
        desc: t('components.notification.password_updated.description'),
      })
    } catch (error: any) {
      console.log(error)
      if (error?.httpStatusText === 'UNAUTHORIZED') {
        toast({
          variant: 'destructive',
          title: t('components.notification.authenticate_failed.heading'),
          description: t(
            'components.notification.authenticate_failed.description',
          ),
        })
        setTimeout(async () => {
          await updateCurrentUser()
          navigate('/auth/login')
        }, 3000)
      }
    }
  }

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
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(handleSubmitForm)}
        >
          <AlertStatus
            message={alert?.message}
            desc={alert?.desc}
            type={alert?.type}
          />
          <FormField
            control={form.control}
            name="old_password"
            render={({ field, formState: { isSubmitting } }) => (
              <FormItem>
                <FormLabel
                  htmlFor="input-old-password"
                  className="mb-1 flex justify-between"
                >
                  <span>
                    <span> {t('components.inputs.old_password.label')}</span>
                  </span>
                </FormLabel>
                <p className="text-xs text-muted-foreground">
                  {t('components.inputs.old_password.notice')}
                </p>
                <FormControl>
                  <InputPassword
                    {...field}
                    id="input-old-password"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
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
                    <span>{t('components.inputs.new_password.label')}</span>
                  </span>
                  <PasswordLevel
                    value={level}
                    config={PasswordLevelsConfig}
                    className="w-[50%]"
                  />
                </FormLabel>
                <FormControl>
                  <InputPassword
                    {...field}
                    id="input-new-password"
                    disabled={isSubmitting}
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
                </FormLabel>
                <FormControl>
                  <InputPassword
                    {...field}
                    id="input-re-password"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <div className="flex justify-start">
            <Button
              className="inline"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              <div className="flex">
                {form.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                <span>{t('components.buttons.change_password')}</span>
              </div>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
