import { HTMLAttributes, PropsWithChildren, type FC } from 'react'
import { cn } from '@/core/utils/shadcn-utils'
import clsx from 'clsx'

export type SpinnerColorfullProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {}

export const SpinnerColorfull: FC<SpinnerColorfullProps> = ({
  className,
  children,
}) => {
  return (
    <div className={cn('relative', className)}>
      <div className="fixed right-0 top-0 z-[-1] h-screen w-full blur-[150px]">
        <div
          className="duration-30 absolute bottom-0 left-0 right-0 top-0 m-auto h-[50%] w-[50%] animate-spin"
          style={{
            background:
              'conic-gradient(from 0deg,#08f,#f60,#bbffa1,#4c00ff,#ab2666,#09f)',
          }}
        ></div>
        <div
          className="duration-30 absolute bottom-0 left-0 right-0 top-0 m-auto h-[50%] w-[50%] animate-spin"
          style={{
            background:
              'conic-gradient(from 0deg,#08f,#f60,#bbffa1,#4c00ff,#ab2666,#09f)',
          }}
        ></div>
      </div>
      {children}
    </div>
  )
}
