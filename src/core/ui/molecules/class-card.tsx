import { HTMLAttributes, ReactNode, type FC } from 'react'
import { cn } from '@/core/utils/shadcn-utils'

export type ClassCardProps = HTMLAttributes<HTMLDivElement> & {
  name?: ReactNode
  variant?: 'small' | 'large'
  subInfo?: ReactNode
  metaData?: ReactNode
  actions?: ReactNode
  illustration?: ReactNode
}

export const ClassCard: FC<ClassCardProps> = ({
  className,
  variant = 'small',
  name,
  subInfo,
  metaData,
  actions,
  illustration,
  ...props
}) => {
  return (
    <div
      className={cn('w-full rounded-2xl bg-slate-200 p-5 shadow-sm', className)}
      {...props}
    >
      <div className="flex items-stretch justify-between gap-2">
        <div className="flex-1 space-y-5">
          <div className="space-y-1">
            <div className="text-sm">{subInfo}</div>
            <div className="text-2xl font-bold md:text-3xl">{name}</div>
            <div className="text-sm font-bold opacity-80 md:text-xl">
              {metaData}
            </div>
          </div>
          {variant == 'large' && actions}
        </div>
        {illustration && variant == 'large' && (
          <div className="relative block basis-[45%] md:hidden xl:block">
            {illustration}
          </div>
        )}
      </div>
    </div>
  )
}
