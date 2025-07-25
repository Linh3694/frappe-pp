import { HTMLAttributes, type FC } from 'react'
import { cn } from '@/core/utils/shadcn-utils'
import { Loader2 } from 'lucide-react'
import { Spin } from '@atoms/spin'
import { useLocales } from '@/core/hooks'

export type LoaderProps = HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'icon'
  size?: number
}

export const Loader: FC<LoaderProps> = ({
  className,
  variant = 'default',
  size = 20,
}) => {
  const { t } = useLocales()
  return (
    <div className={cn('inline-flex items-center gap-3', className)}>
      <Spin size={size} />
      {variant !== 'icon' && <span>{t('common.loading')}</span>}
    </div>
  )
}
