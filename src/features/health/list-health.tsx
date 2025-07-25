import clsx from 'clsx'
import React, { HTMLAttributes, ReactNode } from 'react'
import { healthDocuments } from '@/mock-data/health.json'
import FileListItem from '@molecules/file-list-item'
import { Link } from 'react-router-dom'
import { Download } from 'phosphor-react'
type Props = HTMLAttributes<HTMLDivElement> & {}

export default function ListHealth({ className }: Props) {
  return (
    <div className={clsx('flex flex-col gap-3', className)}>
      {healthDocuments?.map((_: any, index: number) => (
        <FileListItem
          key={index}
          title={_.title}
          subtitle={_.description}
          action={
            <Link to={`/files/file.pdf`}>
              <Download size={30} className="text-brand-orange" weight="bold" />
            </Link>
          }
        />
      ))}
    </div>
  )
}
