import clsx from 'clsx'
import React, { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & RequestListItemType & {

}

export type RequestListItemType = {
  title: string
  subtitle?: string
  status: 'Pending' | 'Approved' | 'Cancelled'
}

export default function RequestListItem({ className, title, subtitle, status }: Props) {

  return (
    <div
      className={clsx(
        'flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-3 rounded-lg border p-4 shadow-sm',
        className,
      )}
    >
      <div>
        <div className="font-semibold text-brand-secondary">{title}</div>
        {subtitle && (
          <div className="text-gray-500">Reason: {subtitle}</div>
        )}
      </div>
      <div
        className={clsx(
          'shrink-0 rounded-md px-2 text-center text-white',
          {
            'bg-brand-green': status === 'Approved',
            'bg-brand-orange': status === 'Pending',
            'bg-brand-red': status === 'Cancelled',
          },
        )}
      >
        {status}
      </div>
    </div>
  )
}
