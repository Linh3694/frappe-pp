import { HTMLAttributes, type FC } from 'react'
import { cn } from '@/core/utils/shadcn-utils'
import { Skeleton } from '@atoms/skeleton'

export type PostSkeletonProps = HTMLAttributes<HTMLDivElement> & {}

export const PostSkeleton: FC<PostSkeletonProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'flex flex-col space-y-3 rounded-r-xl bg-card p-5',
        className,
      )}
    >
      <Skeleton className="h-12 w-12 rounded-full" />
      <Skeleton className="aspect-[16/9] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-full" />
        <div className="flex justify-end">
          <Skeleton className="h-4 w-full basis-1/5" />
        </div>
      </div>
    </div>
  )
}
