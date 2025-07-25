import { Avatar, AvatarFallback, AvatarImage } from '@atoms/avatar'
import clsx from 'clsx'
import React, { HTMLAttributes, ReactNode } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {}

export default function BusRouteCard({ className }: Props) {
  return (
    <div className={clsx('', className)}>
      <div className="h-full w-full rounded-lg border bg-background p-4 shadow-sm">
        <div className="flex flex-col gap-4">
          <div className="text-xl font-bold text-brand-secondary">Summary</div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <div className="font-semibold text-brand-teal">Student</div>
              <div className="flex gap-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">Nguyen Minh Anh</div>
                  <div className="text-sm text-gray-500">Class 11.05</div>
                </div>
              </div>
            </div>
            <div>
              <div className="font-semibold text-brand-teal">Route type</div>
              <div className="text-gray-500">One way (Afternoon only)</div>
            </div>
            <div>
              <div className="font-semibold text-brand-teal">
                Pick-up address
              </div>
              <div className="text-gray-500">
                Block B, Sunrise Riverside, Nguyen Huu Tho Street, Phuoc Kien
                Ward, Nha Be District, Ho Chi Minh City
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
