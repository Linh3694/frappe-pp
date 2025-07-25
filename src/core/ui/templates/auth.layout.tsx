import { cn } from '@/core/utils/shadcn-utils'
import clsx from 'clsx'
import React, { HTMLAttributes, PropsWithChildren, ReactNode } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & PropsWithChildren & {}

export default function AuthLayout({ className, children }: Props) {
  return (
    <div className={cn('lg:flex h-screen items-center justify-center', className)}>
      {children}
    </div>
  )
}
