import {
  forwardRef,
  HTMLAttributes,
  ReactNode,
  RefAttributes,
  useState,
  type FC,
} from 'react'
import { cn } from '@/core/utils/shadcn-utils'
import { Input, InputProps } from '@atoms/input'
import { Button } from '@atoms/button'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

type InputGroupProps = {
  prefix?: ReactNode
  suffix?: (() => ReactNode) | ReactNode
  inputClassName?: string
}

export const InputGroup = forwardRef<
  HTMLInputElement,
  InputProps & InputGroupProps
>(({ className, inputClassName, prefix, suffix, ...props }, ref) => {
  return (
    <div className={cn('relative', className)}>
      <span className="absolute left-0 top-0 flex h-full items-center">
        {prefix}
      </span>
      <Input
        ref={ref}
        className={cn(inputClassName)}
        {...props}

      />
      <span className="absolute right-0 top-0 flex h-full items-center">
        {typeof suffix === 'function' ? suffix?.() : suffix}
      </span>
    </div>
  )
})
