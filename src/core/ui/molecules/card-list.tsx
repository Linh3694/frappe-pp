import clsx from 'clsx'
import React, { HTMLAttributes, PropsWithChildren } from 'react'

type Props = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    title?: string
    subtitle?: string
  }

export default function CardList({
  className,
  children,
  title,
  subtitle,
}: Props) {
  return (
    <div className={clsx(className)}>
      <div className="flex flex-col gap-5 rounded-md border bg-background p-4 shadow-sm">
        <div>
          {title && (
            <div className="text-xl font-semibold text-brand-secondary">
              {title}
            </div>
          )}
          {subtitle && <div className="text-sm text-gray-400">{subtitle}</div>}
        </div>
        <div className="flex-1 pr-4">
          <div className="flex flex-col gap-2">{children}</div>
        </div>
      </div>
    </div>
  )
}
