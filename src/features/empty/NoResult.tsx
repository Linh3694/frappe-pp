import { HTMLAttributes, type FC } from 'react'
import { cn } from '@/core/utils/shadcn-utils'
import Announcement from '@molecules/announcement'
import { WarningCircle } from 'phosphor-react'
import { useLocales } from '@/core/hooks'

export type NoResultProps = HTMLAttributes<HTMLDivElement> & {}

export const NoResult: FC<NoResultProps> = ({ className }) => {
  const { t } = useLocales()
  return (
    <Announcement
      icon={
        <WarningCircle size={90} weight="thin" className="text-primary/70" />
      }
      title={
        <p className="text-2xl font-bold text-primary">{t('components.notification.no_results.heading')}</p>
      }
      subtitle={
        <p className="text-sm text-muted-foreground">
          {t('components.notification.no_results.description')}
        </p>
      }
    />
  )
}
