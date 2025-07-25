import clsx from 'clsx'
import React, { HTMLAttributes, ReactNode } from 'react'
import FileListItem from '../molecules/file-list-item'

type Props = HTMLAttributes<HTMLDivElement> & {
  list?: ReactNode // Temporary
}

export default function GradePageTemplate({ className, list }: Props) {
  return (
    <div className={clsx('', className)}>
      {list}
    </div>
  )
}
