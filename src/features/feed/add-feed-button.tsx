import { cn } from '@/core/utils/shadcn-utils'
import { Button } from '@atoms/button'
import { Plus } from 'phosphor-react'
import React, { HTMLAttributes, ReactNode } from 'react'
import CreateFeedModal from './create-feed-modal'

type Props = HTMLAttributes<HTMLDivElement> & {}

export default function AddFeedButton({ className }: Props) {

  return (
    <CreateFeedModal>
      <Button className={cn("space-x-3",className)}>
        <Plus size={16} />
        <span>Add Feed</span>
      </Button>
    </CreateFeedModal>
  )
}
