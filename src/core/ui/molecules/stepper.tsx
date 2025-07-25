import { HTMLAttributes, type FC } from 'react'
import { cn } from '@/core/utils/shadcn-utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@atoms/tabs'
import styled from 'styled-components'

export type StepperProps = HTMLAttributes<HTMLDivElement> & {
  items?: StepItem[]
  onClickStep?: (value:string) => void
}

export type StepItem = {
  label: string
  value: string
  disabled?: boolean
}
const StepperStyled = styled(TabsList)`
  & {
    background-color: transparent;
    button {
      position: relative;
      /* max-width: 100px; */
      flex: 1;
      .step-item {
        .step-number {
          background-color: hsl(var(--secondary));
          color: hsl(var(--brand-primary));
        }
        .step-label {
          max-width:100px;
          color: hsl(var(--muted-foreground));
          opacity:.7;
          text-wrap: wrap;
        }
      }
      &:not(:last-child) {
        flex: 1;
      }
      &:not(:last-child):after {
        content: '';
        position: absolute;
        top: 25%;
        margin: auto;
        right: 50%;
        transform: translateX(-30px);
        width: calc(100% - 60px);
        height: 1px;
        background-color: #cccccc;
      }
      &[data-state='active'], &[data-state='active'] ~ button {
        background-color: transparent;
        box-shadow:none;
        .step-item {
          .step-number {
            background-color: hsl(var(--brand-primary));
            color: #ffffff; 
          }
          .step-label {
            color: hsl(var(--brand-primary));
          }
        }
      }
    }
  }
`

export const Stepper: FC<StepperProps> = ({ className, items, onClickStep }) => {
  if (!items || items.length === 0) return null
  const reversed = [...items].reverse()

  return (
    <StepperStyled
      className={cn('flex h-auto w-full justify-between flex-row-reverse', className)}
    >
      {reversed.map((item, index) => (
        <TabsTrigger key={item.value} value={item.value} onClick={()=>onClickStep?.(item.value)}>
          <div className="step-item">
            <p className="step-number mb-4 inline-block h-10 w-10 rounded-full text-center text-lg font-bold leading-10">
              {items.length - index}
            </p>
            <p className="step-label text-sm sm:text-md font-bold">{item.label}</p>
          </div>
        </TabsTrigger>
      ))}
    </StepperStyled>
  )
}
