import clsx from 'clsx'
import React, { HTMLAttributes, ReactNode } from 'react'
import { Progress, ProgressIndicator } from '@radix-ui/react-progress'

type Props = HTMLAttributes<HTMLDivElement> & {
  value?: number
  config: LevelsConfigType[]
}

export type LevelsConfigType = {
  label: string // Weak
  color: string // #ffffff
}

export default function PasswordLevel({
  className,
  value = 0,
  config = []
}: Props) {
  return (
    <div className={clsx('flex gap-3 items-center', className)}>
      {value !== 0 && config[value-1].label && (
        <span style={{color: config[value-1].color }}>{config[value-1].label}</span>
      )}
      <Progress
        value={(value / config.length) * 100}
        className={clsx('relative h-[3px] w-full overflow-hidden', {
          'bg-card-foreground': value !== 0,
        })}
      >
        <ProgressIndicator
          className={clsx('h-full bg-primary transition-all duration-150')}
          style={{
            transform: `translateX(-${100 - (value / config.length) * 100}%)`,
            backgroundColor: config[value-1]?.color
          }}
        />
      </Progress>
    </div>
  )
}
