import clsx from 'clsx'
import React, { HTMLAttributes } from 'react'
import Announcement from '@molecules/announcement'
import { LockKey, Plug, Plugs } from 'phosphor-react'
import { Button } from '@atoms/button'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/lib/auth/auth-provider'
import { useLocales } from '@/core/hooks'

type Props = HTMLAttributes<HTMLDivElement> & {}

export default function NoPermissionState({ className }: Props) {
  const { t } = useLocales()
  const navigate = useNavigate()
  const { logout } = useAuthContext()

  const handleBackToLogin = async () => {
    try {
      await logout()
      // window.location.replace('/auth')
    } catch (error) {
      console.log('ERROR: ', error)
    }
  }

  return (
    <div className={clsx('h-screen w-full ', className)}>
      <div className="flex h-full w-full items-center justify-center px-10">
        <Announcement
          className="text-brand-primary"
          icon={<LockKey className="opacity-70" weight="duotone" size={120} />}
          title={t('components.notification.no_permisson.heading')}
          subtitle={t('components.notification.no_permisson.description')}
          action={
            <Button className="mt-5" size="lg" onClick={handleBackToLogin}>
              {t("components.buttons.back_to_login")}
            </Button>
          }
        />
      </div>
    </div>
  )
}
