import CardList from '@molecules/card-list'
import RequestListItem from '@molecules/request-list-item'
import clsx from 'clsx'
import React, { HTMLAttributes, PropsWithChildren } from 'react'
import { requests } from '@/mock-data/request.json'
import { Plus, Rows } from 'phosphor-react'
import { cn } from '@/core/utils/shadcn-utils'
import CreateRecordClassModal from './create-record-class-modal'
import CreateRecordZone from '@molecules/create-record-zone'

type Props = HTMLAttributes<HTMLDivElement> & PropsWithChildren & {}

export default function CreateAttendanceRecord({ className }: Props) {
  return (
    <CreateRecordClassModal>
      <CreateRecordZone />
    </CreateRecordClassModal>
  )
}
