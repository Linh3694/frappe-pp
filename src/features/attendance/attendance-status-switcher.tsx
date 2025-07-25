import { HTMLAttributes, ReactNode, useEffect, useState, type FC } from 'react'
import { cn } from '@/core/utils/shadcn-utils'
import { CalendarCheck, CalendarX, CheckCircle, Clock } from 'phosphor-react'
import styled from 'styled-components'
import { Tooltip, TooltipContent, TooltipTrigger } from '@atoms/tooltip'
import { Label } from '@atoms/label'
import { AttendanceCode } from '@/types/Extends/Attendance'
import { useLocales } from '@/core/hooks'

type AttendanceStatusSwitcherProps = {
  name?: string
  value?: AttendanceCode
  onChange?: (status: AttendanceCode) => void
  defaultValue?: AttendanceCode
  variant?: 'horizontal' | 'vertical'
}

type StatusOptionItemType = {
  valueItem?: AttendanceCode
  symbol?: ReactNode
  label?: string
  className?: string
}

const RadioItemStyled = styled.div``

export const AttendanceStatusSwitcher: FC<AttendanceStatusSwitcherProps> = ({
  name,
  value,
  onChange,
  defaultValue,
  variant = 'horizontal',
}) => {
  const { t } = useLocales()
  const [inputValue, setInputValue] = useState<AttendanceCode>()

  const ListStatus: StatusOptionItemType[] = [
    {
      label: t('common.present'),
      valueItem: AttendanceCode.PRESENT,
      symbol: <CheckCircle weight="duotone" size={25} />,
      className:
        'text-brand-green peer-checked:bg-brand-green peer-checked:text-white',
    },
    {
      label: t('common.excused_absence'),
      valueItem: AttendanceCode.EXCUSED_ABSENCE,
      symbol: <CalendarCheck weight="duotone" size={25} />,
      className:
        'text-brand-teal peer-checked:bg-brand-teal  peer-checked:text-white',
    },
    {
      label: t('common.unexcused_absence'),
      valueItem: AttendanceCode.UNEXCUSED_ABSENCE,
      symbol: <CalendarX weight="duotone" size={25} />,
      className:
        'text-brand-red peer-checked:bg-brand-red  peer-checked:text-white',
    },
    {
      label: t('common.late'),
      valueItem: AttendanceCode.LATE,
      symbol: <Clock weight="duotone" size={25} />,
      className:
        'text-brand-orange peer-checked:bg-brand-orange peer-checked:text-white',
    },
  ]

  const handleOnChange = (status: AttendanceCode) => {
    setInputValue(status)
    onChange?.(status)
  }

  useEffect(() => {
    if (defaultValue && !value) {
      setInputValue(defaultValue)
    } else {
      setInputValue(value)
    }
  }, [value])

  return (
    <div
      className={cn('inline-flex gap-3', {
        'flex-col': variant === 'vertical',
      })}
    >
      {ListStatus.map((item) => (
        <RadioItemStyled
          className={cn('flex items-center gap-4')}
          key={item.valueItem}
        >
          <input
            type="radio"
            id={`${name}_${item.valueItem}`}
            value={item.valueItem}
            name={name}
            checked={inputValue === item.valueItem}
            onChange={() => item.valueItem && handleOnChange(item.valueItem)}
            className="peer hidden"
          />
          {variant === 'vertical' && (
            <>
              <Label
                htmlFor={`${name}_${item.valueItem}`}
                className={cn(
                  'inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border text-xl peer-checked:border-none peer-checked:bg-slate-300 sm:h-12 sm:w-12',
                  item.className,
                )}
              >
                {item.symbol}
              </Label>
              <Label
                htmlFor={`${name}_${item.valueItem}`}
                className="cursor-pointer"
              >
                {item.label}
              </Label>
            </>
          )}
          {variant === 'horizontal' && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Label
                  htmlFor={`${name}_${item.valueItem}`}
                  className={cn(
                    'inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border text-xl peer-checked:border-none peer-checked:bg-card-foreground sm:h-12 sm:w-12',
                    item.className,
                  )}
                >
                  {item.symbol}
                </Label>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">{item.label}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </RadioItemStyled>
      ))}
    </div>
  )
}
