import clsx from 'clsx'
import React, { HTMLAttributes, PropsWithChildren } from 'react'

type Props = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    label?: string
    cols?: number
  }

export default function PegBoard({ className, label, cols = 4, children }: Props) {
  return (
    <div className="flex flex-col gap-3 rounded-lg">
      {label && <h4 className="font-bold text-primary">{label}</h4>}
      <div className={`grid grid-cols-${cols} place-items-center gap-2 items-start`}>
        {children}
      </div>
    </div>
  )
}
