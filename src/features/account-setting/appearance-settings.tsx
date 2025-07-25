import { HTMLAttributes, type FC } from 'react'
import { cn } from '@/core/utils/shadcn-utils'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@atoms/select'
import { Separator } from '@atoms/separator'
import { LanguageSelector } from '@features/preferences/language-selector'
import { ThemeSelector } from '@features/preferences/theme-selector'
import { useLocales } from '@/core/hooks'
import env from '@/config/env'

export type AppearanceSettingsProps = HTMLAttributes<HTMLDivElement> & {}

export const AppearanceSettings: FC<AppearanceSettingsProps> = ({
  className,
}) => {
  const { t } = useLocales()
  return (
    <div className={cn(className)}>
      <div className="mb-8">
        <p className="text-lg font-bold text-brand-secondary">
          {t('common.appearance')}
        </p>
        <p className="text-md text-muted-foreground">
          {t('common.appearance_meta')}
        </p>
      </div>
      <div className={cn('flex flex-col gap-8', className)}>
        <div className="flex items-center justify-between gap-2">
          <div className="space-y-1">
            <p className="font-bold text-brand-secondary">
              {t('common.theme')}
            </p>
            <p className="hidden text-muted-foreground lg:block">
              {t('common.theme_meta')}
            </p>
          </div>
          <ThemeSelector />
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="space-y-1">
            <p className="font-bold text-brand-secondary">
              {' '}
              {t('common.language')}
            </p>
            <p className="hidden text-muted-foreground lg:block">
              {t('common.language_meta')}
            </p>
          </div>
          <LanguageSelector />
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="space-y-1">
            <p className="font-bold text-brand-secondary">
              {t('common.version')}
            </p>
          </div>
          {env.VERSION}
        </div>
      </div>
    </div>
  )
}
