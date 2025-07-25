import { HTMLAttributes, ReactNode, type FC } from 'react'
import { cn } from '@/core/utils/shadcn-utils'
import styled from 'styled-components'
import { format } from 'date-fns'
import { Dot } from 'lucide-react'

export type TimelineItem = {
  start: Date
  end: Date
  extend: any
}

export type TimelineProps = HTMLAttributes<HTMLDivElement> & {
  items?: TimelineItem[]
  itemContent?: (data: any) => ReactNode
}

const TimeLineStyled = styled.div`
  .milestone:not(:last-child) .dot {
    position: relative;
    &:after {
      content: '';
      position: absolute;
      top: 30px;
      left: 0;
      right: 0;
      margin: auto;
      width: 0;
      height: 100%;
      /* background-color: #000; */
      border: 0.5px solid hsl(var(--primary));
    }
  }
`
export const Timeline: FC<TimelineProps> = ({
  className,
  items,
  itemContent,
}) => {
  return (
    <div className={cn(className)}>
      <TimeLineStyled className="flex flex-col gap-5">
        {items?.map((item,index) => (
          <div key={index} className="milestone flex items-stretch">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  'text-lg rounded-full font-semibold text-primary',
                )}
              >
                {format(item.start, 'HH:mm')}
              </span>
              <span
                className={cn(
                  'text-sm rounded-full text-muted-foreground',
                )}
              >
                {format(item.end, 'HH:mm')}
              </span>
            </div>
            <div className="dot">
              <Dot size={40} className="text-primary" />
            </div>
            <div className="flex-1">{itemContent?.(item.extend)}</div>
          </div>
        ))}
      </TimeLineStyled>
    </div>
  )
}
