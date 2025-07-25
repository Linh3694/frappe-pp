import { cn } from '@/core/utils/shadcn-utils'
import React, { HTMLAttributes, ReactNode } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
  form?: ReactNode
}

export default function LeaveRequestPageTemplate({ className, form }: Props) {
  return <div className={cn(className)}>{form}</div>
}
