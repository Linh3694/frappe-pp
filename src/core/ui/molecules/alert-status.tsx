import clsx from 'clsx'
import React, { HTMLAttributes, ReactNode } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@atoms/alert'
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  CircleX,
  Info,
} from 'lucide-react'

type Props = {
  className?: string
  message?: ReactNode
  desc?: ReactNode
  type?: 'success' | 'error' | 'warning' | 'info'
}

export type AlertContentType = {
  message: ReactNode
  desc?: ReactNode
  type?: 'success' | 'error' | 'warning' | 'info'
}

export default function AlertStatus({
  className,
  message,
  desc,
  type,
}: Props) {
  const ClassTextColors = {
    'text-brand-green': type === 'success',
    'text-brand-red': type === 'error',
    'text-brand-orange': type === 'warning',
    'text-brand-blue': type === 'info',
  }
  if(!message) return null
  return (
    <Alert
      className={clsx(
        {
          'border-brand-green bg-brand-green/10': type === 'success',
          'border-brand-red bg-brand-red/10': type === 'error',
          'border-brand-orange bg-brand-orange/10': type === 'warning',
          'border-brand-blue bg-brand-blue/10': type === 'info',
        },
        className,
      )}
    >
      {type === 'error' && <CircleX className="h-4 w-4 !text-brand-red" />}
      {type === 'success' && (
        <CheckCircle className="h-4 w-4 !text-brand-green" />
      )}
      {type === 'warning' && (
        <AlertTriangle className="h-4 w-4 !text-brand-orange" />
      )}
      {type === 'info' && <Info className="!text-brand-blue h-4 w-4" />}
      <AlertTitle className={clsx(ClassTextColors)}>{message}</AlertTitle>
      {desc && (
        <AlertDescription className={clsx('text-xs', ClassTextColors)}>
          {desc}
        </AlertDescription>
      )}
    </Alert>
  )
}
