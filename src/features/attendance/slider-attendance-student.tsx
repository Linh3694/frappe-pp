import {
  HTMLAttributes,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FC,
} from 'react'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@atoms/carousel'
import styled from 'styled-components'
import { cn } from '@/core/utils/shadcn-utils'
import { Avatar, AvatarFallback } from '@atoms/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { genAvatarDefault, getInitials, getShortName } from '@/lib/utils/common'

import { Input } from '@atoms/input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@atoms/select'
import { Button } from '@atoms/button'
import { AttendanceStatusSwitcher } from './attendance-status-switcher'
import { AttendanceCode } from '@/types/Extends/Attendance'
import { useSearchParams } from 'react-router-dom'
import { useGetSchoolClassById } from '@/api/schoolClass/use-get-school-class-by-id-'
import { format } from 'date-fns'
import { ParticipantExtend } from '@/types/Extends/Person'
import { useLocales, useResponsive } from '@/core/hooks'
import { Combobox, ComboboxItemsType } from '@atoms/combobox'

export type SliderAttendanceStudentProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    students?: ParticipantExtend[]
    onChangeAttendance?: (attendance: AttendanceData) => void
  }

type AttendanceItemData = {
  status?: AttendanceCode
  reason?: string
}

export type AttendanceData = Record<string, AttendanceItemData>

const CarouselEnhancedStyled = styled(Carousel)`
  select option {
    color: #000;
  }
`

export const SliderAttendanceStudent: FC<SliderAttendanceStudentProps> = ({
  className,
  students,
  onChangeAttendance,
}) => {
  const { t } = useLocales()
  const { isDesktop } = useResponsive()
  const [searchParams] = useSearchParams()
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [attendance, setAttendance] = useState<AttendanceData>()

  console.log(students)

  const StudentsOptions = useMemo<ComboboxItemsType>(
    () =>
      (students || []).map((s) => ({
        label: `${getShortName(s.full_name)}${s.school_class_short_title ? ' - ' + s.school_class_short_title : ''}`,
        value: s.name,
      })),
    [JSON.stringify(students)],
  )

  const scrollTo = useCallback(
    (index: number) => api && api.scrollTo(index),
    [api],
  )

  const handleUpdateAttendance = (id: string, data: AttendanceItemData) => {
    const new_attendance = { ...attendance }
    new_attendance[id] = { ...new_attendance[id], ...data }
    setAttendance(new_attendance)
    onChangeAttendance?.(new_attendance)
  }

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  useEffect(() => {
    if (students && !attendance) {
      const new_attendance = students?.reduce<AttendanceData>((prev, item) => {
        if (item.role === 'Student') {
          prev[item.person] = {
            status: AttendanceCode.PRESENT,
          }
        }
        return prev
      }, {})
      setAttendance(new_attendance)
      onChangeAttendance?.(new_attendance)
    }
  }, [JSON.stringify(students)])

  return (
    <CarouselEnhancedStyled setApi={setApi} className={cn(className)}>
      <div className="mx-auto flex items-center justify-between gap-0 bg-brand-secondary/80 px-4 py-2 text-white  ">
        <p
          className="cursor-pointers w-1/3 text-left text-xs opacity-70"
          onClick={() => scrollTo(current - 1)}
        >
          {getShortName(students?.[current - 1]?.full_name || '')}
        </p>
        <div className="w-1/3 text-center text-xs">
          <Combobox
            align={'center'}
            className="border-0 !bg-transparent p-0 !text-white"
            dropdownClassName="min-w-[300px]"
            items={StudentsOptions}
            placeholder={t('components.inputs.filter_class.placeholder')}
            emptyContent={t('components.inputs.filter_class.empty')}
            searchPlaceholder={t(
              'components.inputs.filter_class.search_placeholder',
            )}
            value={students?.[current]?.name}
            onSelect={(value) => {
              const nextValue = students?.findIndex((s) => s.name === value)
              setTimeout(() => {
                scrollTo(nextValue || 0)
              }, 100)
            }}
          />
        </div>
        <p
          className="w-1/3 cursor-pointer text-right text-xs opacity-70"
          onClick={() => scrollTo(current + 1)}
        >
          {getShortName(students?.[current + 1]?.full_name || '')}
        </p>
      </div>
      <p className="bg-card-foreground py-1 text-center text-xs">
        {t('common.swipe_next_student')}
      </p>

      <CarouselContent>
        {students
          ?.filter((p) => p.role === 'Student')
          .map((student) => (
            <CarouselItem key={student.person} className="p-0">
              <AttendanceStudentSlideItem
                id={student.person}
                avatar={student.avatar}
                birthday={student.date_of_birth}
                name={student.full_name}
                onChangeStatus={(status) =>
                  handleUpdateAttendance(student.person, { status })
                }
                onChangeReason={(reason) =>
                  handleUpdateAttendance(student.person, { reason })
                }
              />
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious className="left-5 top-[20%]" />
      <CarouselNext className="right-5 top-[20%]" />
    </CarouselEnhancedStyled>
  )
}

export type AttendanceStudentSlideItemProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    id?: string
    name?: string
    avatar?: string
    mainClass?: string
    birthday?: string
    onChangeStatus?: (status: AttendanceCode) => void
    onChangeReason?: (reason: string) => void
  }

export const AttendanceStudentSlideItem: FC<
  AttendanceStudentSlideItemProps
> = ({
  className,
  id,
  avatar,
  name,
  mainClass,
  birthday,
  onChangeStatus,
  onChangeReason,
}) => {
  const { t } = useLocales()
  return (
    <div className={cn(className)}>
      <div className="relative py-5">
        <div className="space-y-3">
          <Avatar className="mx-auto h-20 w-20 bg-card-foreground">
            <AvatarImage
              className="w-full object-cover"
              src={avatar || genAvatarDefault(name)}
            />
            <AvatarFallback>{getInitials(name || '?')}</AvatarFallback>
          </Avatar>
          <center>
            <p className="text-md font-medium">
              {name} {mainClass && `- ${mainClass}`}
            </p>
            <p className="text-sm">
              {birthday && format(birthday, 'dd/MM/yyyy')}
            </p>
          </center>
        </div>
      </div>
      {/* <div className="container mx-auto flex justify-center gap-x-10 border-b border-t py-2">
        <div className="text-center">
          <p className="text-2xl font-bold text-brand-green">17</p>
          <p className="text-sm text-muted-foreground">Present</p>
        </div>
        <div className="w-[1px] bg-slate-300"></div>
        <div className="text-center">
          <p className="text-2xl font-bold text-brand-red">1</p>
          <p className="text-sm text-muted-foreground">Absent</p>
        </div>
        <div className="w-[1px] bg-slate-300"></div>
        <div className="text-center">
          <p className="text-2xl font-bold text-brand-orange">2</p>
          <p className="text-sm text-muted-foreground">Late</p>
        </div>
      </div> */}
      <div className="container mx-auto bg-card-foreground/30 py-5">
        <AttendanceStatusSwitcher
          variant="vertical"
          name={id}
          defaultValue={AttendanceCode.PRESENT}
          onChange={(v) => {
            onChangeStatus?.(v)
          }}
        />
      </div>
      <div className="container mx-auto space-y-3 py-4 pb-10">
        <p>{t('components.inputs.reason.label')}</p>
        <Input
          className="border-l-transparent border-r-transparent border-t-transparent shadow-none"
          placeholder={t('components.inputs.reason.placeholder')}
          onChange={(e) => onChangeReason?.(e.target.value)}
        />
      </div>
    </div>
  )
}
