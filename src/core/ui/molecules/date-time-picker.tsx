import { cn } from '@/core/utils/shadcn-utils'
import React, {
  HTMLAttributes,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Calendar } from '@atoms/calendar'
import { Slider } from '@atoms/slider'
import { Popover, PopoverContent } from '@atoms/popover'
import { PopoverContentProps, PopoverTrigger } from '@radix-ui/react-popover'
import { Button } from '@atoms/button'
import { format } from 'date-fns'
import { Matcher } from 'react-day-picker'
import { useLocales } from '@/core/hooks'
import { getDateLocale } from '@/lib/utils/common'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@atoms/select'
import { months, years } from '@/core/constant/calendar'

type Props = PropsWithChildren & {
  className?: string
  value?: Date
  onChange?: (d: Date) => void
  type?: 'date' | 'date-time'
  disabled?: Matcher | Matcher[] | undefined
  contentProps?: PopoverContentProps
}

// Not used
export default function DateTimePicker({
  className,
  type = 'date',
  value,
  disabled,
  onChange,
  children,
  contentProps,
}: Props) {
  const { currentLanguage, t } = useLocales()
  const [date, setDate] = useState<Date>(new Date())
  const [open, setOpen] = useState(false)
  const [month, setMonth] = useState<number>()
  const [year, setYear] = useState<number>()

  const handleSelectDate = (dateValue: Date) => {
    setDate(dateValue)
    onChange?.(dateValue)
    setOpen(false)
  }

  const handleChangeMonth = (str_month: string) => {
    const month = parseInt(str_month)
    let d = date
    d.setMonth(month - 1)
    setMonth(month)
    setDate(d)
  }

  const handleChangeYear = (str_year: string) => {
    const year = parseInt(str_year)
    let d = date
    d.setFullYear(year)
    setYear(year)
    setDate(d)
  }

  useEffect(() => {
    if (value && value?.getTime() !== date.getTime()) {
      setDate(value)
    }
  }, [value])

  useEffect(() => {
    if (!open) {
      onChange?.(date)
    }
  }, [open])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-auto p-0" {...contentProps}>
        <div className={cn('relative inline-block', className)}>
          <div className="flex justify-end">
            <Select
              value={(date.getMonth() + 1).toString()}
              onValueChange={handleChangeMonth}
            >
              <SelectTrigger className="w-auto !border-0 !shadow-none !outline-none !ring-0 !ring-offset-0">
                <SelectValue
                  placeholder={t('components.inputs.month.placeholder')}
                />
              </SelectTrigger>
              <SelectContent>
                {months[currentLanguage].map((m) => (
                  <SelectItem
                    key={m.number.toString()}
                    value={m.number.toString()}
                  >
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={date.getFullYear().toString()}
              onValueChange={handleChangeYear}
            >
              <SelectTrigger className="w-auto !border-0 !shadow-none !outline-none !ring-0 !ring-offset-0">
                <SelectValue
                  placeholder={t('components.inputs.year.placeholder')}
                />
              </SelectTrigger>
              <SelectContent>
                {years(
                  new Date().getFullYear() - 100,
                  new Date().getFullYear(),
                ).map((y) => (
                  <SelectItem key={y.toString()} value={y.toString()}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Calendar
            key={date.getTime()}
            className="inline-block"
            mode="single"
            defaultMonth={date}
            selected={date}
            onSelect={(d) => d && handleSelectDate(d)}
            initialFocus
            disabled={disabled}
            locale={getDateLocale(currentLanguage)}
          />
          {type === 'date-time' && (
            <div className="mt-2 flex w-full items-center gap-5 px-2 pb-5">
              <span className="text-sm">{format(date, 'HH:mm:ss')}</span>
              <div className="flex flex-1 flex-col gap-5">
                <Slider />
                <Slider />
                <Slider />
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
