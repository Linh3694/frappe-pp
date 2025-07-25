import { cn } from '@/core/utils/shadcn-utils'
import { List, ListDashes, Plus, Rows } from 'phosphor-react'
import { forwardRef, type HTMLAttributes } from 'react'

export interface CreateRecordZoneProps extends HTMLAttributes<HTMLDivElement> {}

const CreateRecordZone = forwardRef<HTMLDivElement, CreateRecordZoneProps>(
  ({ ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        <div
          className={cn(
            'flex cursor-pointer flex-row items-center justify-center gap-x-5 rounded-md border-2 border-dashed border-slate-300 p-3 transition-colors duration-300 hover:border-brand-secondary/50 sm:flex-col sm:p-6',
            props.className,
          )}
        >
          <div className="relative inline-block">
            <Rows size={70} weight="duotone" className="text-slate-200" />
            <Plus
              size={30}
              weight="light"
              className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-full border border-brand-secondary bg-background px-1 text-brand-secondary"
            />
          </div>
          <p className="text-slate-600">Create a attendance record</p>
        </div>
      </div>
    )
  },
)
export default CreateRecordZone
