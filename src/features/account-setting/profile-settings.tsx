import { HTMLAttributes, type FC, useCallback, useContext } from 'react'
import { cn } from '@/core/utils/shadcn-utils'
import { Avatar, AvatarFallback, AvatarImage } from '@atoms/avatar'
import { genAvatarDefault, getInitials } from '@/lib/utils/common'
import { Button } from '@atoms/button'
import { Pencil, Trash, Upload } from 'phosphor-react'
import { Separator } from '@atoms/separator'
import { AuthContext } from '@/lib/auth/auth-provider'
import { format } from 'date-fns'
import { LogOut } from 'lucide-react'
import { useLocales } from '@/core/hooks'

export type ProfileSettingsProps = HTMLAttributes<HTMLDivElement> & {}

export const ProfileSettings: FC<ProfileSettingsProps> = ({ className }) => {
  const { t } = useLocales()
  const { currentUser, userInfo, logout } = useContext(AuthContext)

  const handleLogout = useCallback(async () => {
    try {
      await logout()
      // window.location.replace('/auth')
    } catch {
      // TODO: Handle error
    }
  }, [])

  return (
    <div className={cn('', className)}>
      <div className="mb-8">
        <p className="text-lg font-bold text-brand-secondary">
          {t('common.your_profile')}
        </p>
        <p className="text-md text-muted-foreground">
          {t('common.your_profile_meta')}
        </p>
      </div>
      <div className="flex flex-wrap gap-x-10 gap-y-5 md:gap-x-20">
        <div className="flex flex-col gap-x-10 gap-y-5">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-bold text-brand-secondary">
                {t('common.full_name')}
              </p>
              <p className="text-muted-foreground">{userInfo?.full_name}</p>
            </div>
          </div>
          {userInfo?.email && (
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-bold text-brand-secondary">
                  {t('common.email')}
                </p>
                <p className="text-muted-foreground">{userInfo?.email}</p>
              </div>
            </div>
          )}
          {userInfo?.date_of_birth && (
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-bold text-brand-secondary">
                  {t('common.date_of_birth')}
                </p>
                <p className="text-muted-foreground">
                  {format(userInfo?.date_of_birth, 'dd/MM/yyyy')}
                </p>
              </div>
            </div>
          )}
          {userInfo?.phone_number && (
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-bold text-brand-secondary">
                  {t('common.phone')}
                </p>
                <p className="text-muted-foreground">
                  {userInfo?.phone_number}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-bold text-brand-secondary">{t('common.avatar')}</p>
          <Avatar className="h-20 w-20 border">
            <AvatarImage
              className="object-cover"
              src={userInfo?.avatar || genAvatarDefault(userInfo?.full_name)}
            />
            <AvatarFallback className="bg-brand-secondary text-2xl font-light text-white">
              {getInitials(currentUser)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      <Separator className="my-5" />
      <div className="flex items-center justify-between gap-5">
        <div className="mb-4">
          <p className="text-lg font-bold text-brand-secondary">
            {t('common.switch_account')}
          </p>
          <p className="text-md text-muted-foreground">
            {t('common.switch_account_meta')}
          </p>
        </div>
        <Button
          variant="outline"
          className="border-destructive text-destructive hover:bg-destructive/5 hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="mr-3" size={14} />
          <span>{t('components.buttons.sign_out')}</span>
        </Button>
      </div>
    </div>
  )
}
