import { cn } from '@/core/utils/shadcn-utils'
import { Button } from '@atoms/button'
import { Calendar } from '@atoms/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@atoms/popover'
import { ScrollArea, ScrollBar } from '@atoms/scroll-area'
import {
  addDays,
  endOfWeek,
  format,
  isSameDay,
  previousDay,
  startOfISOWeek,
} from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { CaretDown } from 'phosphor-react'
import {
  HTMLAttributes,
  useState,
  useRef,
  type FC,
  MutableRefObject,
  RefObject,
  useEffect,
} from 'react'
import { useDraggable } from 'react-use-draggable-scroll'

export type WeeklyPickerProps = HTMLAttributes<HTMLDivElement> & {
  value?: Date
  displayWeekend?: boolean
  onChangeDate?: (date: Date) => void
  onChangeDay?: (date: Date) => void
}

export const WeeklyPicker: FC<WeeklyPickerProps> = ({
  className,
  displayWeekend = true,
  value,
  onChangeDate,
  onChangeDay,
}) => {
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false)
  const [date, setDate] = useState<Date>(new Date())
  const [currentDate, setCurrentDate] = useState<Date>(date)
  const earlyWeek = startOfISOWeek(date)

  const handleOpenChange = (isOpen: boolean) => {
    setOpenDatePicker(isOpen)
    // reset()
  }

  const onChangeDatePicker = (date: Date | undefined) => {
    if (date) {
      setDate(date)
      setCurrentDate(date)
      setOpenDatePicker(false)
      onChangeDate?.(date)
    }
  }

  const handleChangeDate = (date: Date) => {
    setCurrentDate(date)
    onChangeDay?.(date)
  }

  useEffect(() => {
    if (value && value !== date) {
      setDate(value)
      setCurrentDate(value)
    }
  }, [value])

  return (
    <div className={cn('space-y-3', className)}>
      <Popover open={openDatePicker} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <div className="flex cursor-pointer items-center gap-3">
            <p className="text-xl font-bold text-primary">
              {' '}
              {date ? format(date, 'MMMM, yyyy') : <span>Pick a date</span>}
            </p>
            <CaretDown />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onChangeDatePicker}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <div className="scrollbar-hide overflow-x-auto rounded-lg border p-3 text-center">
        <div className="flex max-w-full justify-around gap-5  overflow-x-auto">
          {Array.from(Array(7).keys()).map((day) => {
            if (!displayWeekend && day > 4) {
              return null
            }
            return (
              <DayItem
                key={day}
                date={day === 0 ? earlyWeek : addDays(earlyWeek, day)}
                active={isSameDay(addDays(earlyWeek, day), currentDate)}
                onClick={() => handleChangeDate(addDays(earlyWeek, day))}
                weekend={day === 5 || day === 6}
              />
            )
          })}

          {/* <DayItem
            date={addDays(earlyWeek, 1)}
            active={isSameDay(addDays(earlyWeek, 1), currentDate)}
            onClick={() => handleChangeDate(addDays(earlyWeek, 1))}
          />
          <DayItem
            date={addDays(earlyWeek, 2)}
            active={isSameDay(addDays(earlyWeek, 2), currentDate)}
            onClick={() => handleChangeDate(addDays(earlyWeek, 2))}
          />
          <DayItem
            date={addDays(earlyWeek, 3)}
            active={isSameDay(addDays(earlyWeek, 3), currentDate)}
            onClick={() => handleChangeDate(addDays(earlyWeek, 3))}
          />
          <DayItem
            date={addDays(earlyWeek, 4)}
            active={isSameDay(addDays(earlyWeek, 4), currentDate)}
            onClick={() => handleChangeDate(addDays(earlyWeek, 4))}
          />
          {displayWeekend && (
            <DayItem
              date={addDays(earlyWeek, 5)}
              active={isSameDay(addDays(earlyWeek, 5), currentDate)}
              onClick={() => handleChangeDate(addDays(earlyWeek, 5))}
              weekend
            />
          )}
          {displayWeekend && (
            <DayItem
              date={addDays(earlyWeek, 6)}
              active={isSameDay(addDays(earlyWeek, 6), currentDate)}
              onClick={() => handleChangeDate(addDays(earlyWeek, 6))}
              weekend
            />
          )} */}
        </div>
      </div>
    </div>
  )
}

export type DayItemProps = HTMLAttributes<HTMLDivElement> & {
  date?: Date
  active?: boolean
  weekend?: boolean
  onClick?: VoidFunction
}

export const DayItem: FC<DayItemProps> = ({
  className,
  date,
  active,
  weekend,
  onClick,
}) => {
  return (
    <div
      className={cn(
        'group flex cursor-pointer flex-col items-center justify-center  gap-1',
        className,
      )}
      onClick={onClick}
    >
      <div
        className={cn('text-xs font-medium uppercase opacity-70', {
          'text-brand-red': weekend,
        })}
      >
        {format(date?.toDateString() || '', 'E')}
      </div>
      <div
        className={cn(
          'rounded-md px-1.5 py-1 text-sm font-bold uppercase transition-colors duration-300',
          {
            'bg-brand-teal text-white': active,
            'group-hover:text-brand-teal': !active,
          },
        )}
      >
        {format(date?.toDateString() || '', 'dd')}
      </div>
    </div>
  )
}
