import clsx from 'clsx'
import React, { HTMLAttributes, ReactNode } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
  info?: ReactNode
}

export default function BusPageTemplate({ className, info }: Props) {
  return (
    <div className={clsx(className)}>
     {info}
    </div>
  )
}
