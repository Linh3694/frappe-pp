import CardList from '@molecules/card-list'
import RequestListItem from '@molecules/request-list-item'
import clsx from 'clsx'
import React, { HTMLAttributes, PropsWithChildren } from 'react'
import { requests } from '@/mock-data/request.json'

type Props = HTMLAttributes<HTMLDivElement> & PropsWithChildren & {}

export default function ListRequest({ className }: Props) {
  return (
    <CardList
      className={clsx(className)}
      title="Leave requests"
      subtitle="View and manage all leave requests"
    >
      {requests.map((request, index) => (
        <RequestListItem
          key={index + request.time}
          title={request.time}
          subtitle={request.reason}
          status={request.status}
        />
      ))}
    </CardList>
  )
}
