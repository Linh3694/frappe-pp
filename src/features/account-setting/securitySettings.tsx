import { HTMLAttributes, type FC } from 'react'
import { cn } from '@/core/utils/shadcn-utils'
import { Button } from '@atoms/button'
import ChangePasswordForm from '@features/account/change-password.form'
import { useLocales } from '@/core/hooks'

export type SecuritySettingsProps = HTMLAttributes<HTMLDivElement> & {}

export const SecuritySettings: FC<SecuritySettingsProps> = ({ className }) => {
  const { t } = useLocales()

  return (
    <div className={cn(className)}>
      <div className={cn('flex flex-col', className)}>
        <div className="mb-8">
          <p className="text-lg font-bold text-brand-secondary">
            {t('common.account_password')}
          </p>
          <p className="text-md text-muted-foreground">
          {t('common.account_password_meta')}
          </p>
        </div>
        <div className="max-w-md">
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  )
}
