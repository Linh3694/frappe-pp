import {
  HTMLAttributes,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type FC,
} from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@atoms/popover'
import { cn } from '@/core/utils/shadcn-utils'
import { format } from 'date-fns'
import { Calendar } from '@atoms/calendar'
import { Button } from '@atoms/button'
import { CalendarIcon } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@atoms/select'
import { useTeacher } from '@/lib/teacher/teacher-provider'
import { useLocales } from '@/core/hooks'
import { useSearchParams } from 'react-router-dom'
import DateTimePicker from '@molecules/date-time-picker'
import { getDateLocale } from '@/lib/utils/common'
import { Combobox, ComboboxItemsType } from '@atoms/combobox'

export type AttendanceFilterValues = {
  date?: Date
  classId?: string
}

type Props = HTMLAttributes<HTMLDivElement> & {
  filterDate?: boolean
  filterClass?: boolean
  filterSubject?: boolean
  value?: AttendanceFilterValues
  onFilterChange?: (filter: AttendanceFilterValues) => void
}

export default function AttendanceFilter({
  className,
  filterDate = true,
  filterClass = true,
  filterSubject = true,
  value,
  onFilterChange,
}: Props) {
  const { t, currentLanguage } = useLocales()
  const { schoolClasses, courseClasses } = useTeacher()
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [filter, setFilter] = useState<AttendanceFilterValues>()

  const SchoolClassOptions = useMemo<ComboboxItemsType>(
    () =>
      (schoolClasses || []).map((c) => ({
        label: t('common.class_c', { class: c.short_title }),
        value: c.name,
      })),
    [JSON.stringify(schoolClasses)],
  )

  const CourseClassOptions = useMemo<ComboboxItemsType>(
    () =>
      (courseClasses || []).map((c) => ({
        label: c.title,
        value: c.name,
      })),
    [JSON.stringify(courseClasses)],
  )

  const handleFilter = (filterValue: AttendanceFilterValues) => {
    const newValues = { ...filter, ...filterValue }
    setFilter(newValues)
    onFilterChange?.(newValues)
    setCalendarOpen(false)
  }

  useEffect(() => {
    value && setFilter(value)
  }, [value])

  return (
    <div
      className={cn('flex flex-wrap gap-x-5 gap-y-1 sm:flex-nowrap', className)}
    >
      {filterDate && (
        <DateTimePicker
          value={filter?.date}
          onChange={(date) => handleFilter({ date })}
          disabled={{ after: new Date() }}
        >
          <Button
            variant={'outline'}
            className={cn(
              'h-[40px] w-full justify-start text-left font-normal sm:basis-1/2',
              !filter?.date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {filter?.date ? (
              format(filter?.date, 'dd MMM, yyyy', {
                locale: getDateLocale(currentLanguage),
              })
            ) : (
              <span>Select date</span>
            )}
          </Button>
        </DateTimePicker>
      )}
      {filterClass && (
        <Combobox
          className="w-full sm:max-w-[300px]"
          dropdownClassName="min-w-[200px]"
          items={SchoolClassOptions}
          placeholder={t('components.inputs.filter_class.placeholder')}
          emptyContent={t('components.inputs.filter_class.empty')}
          searchPlaceholder={t(
            'components.inputs.filter_class.search_placeholder',
          )}
          value={filter?.classId}
          onSelect={(classId) => handleFilter({ classId })}
        />
      )}
      {filterSubject && (
        <Combobox
          className="w-full sm:max-w-[300px]"
          dropdownClassName="min-w-[200px]"
          items={CourseClassOptions}
          placeholder={t('components.inputs.filter_class.placeholder')}
          emptyContent={t('components.inputs.filter_class.empty')}
          searchPlaceholder={t(
            'components.inputs.filter_class.search_placeholder',
          )}
          value={filter?.classId}
          onSelect={(classId) => handleFilter({ classId })}
        />
      )}
    </div>
  )
}
