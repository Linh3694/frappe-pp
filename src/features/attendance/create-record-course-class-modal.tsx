import { Button } from '@atoms/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@atoms/dialog'
import { DialogTrigger } from '@radix-ui/react-dialog'
import React, {
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import styled from 'styled-components'
import { ScrollArea } from '@radix-ui/themes'
import { Separator } from '@atoms/separator'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { useSWRConfig } from 'frappe-react-sdk'
import { FRAPPE_APIS } from '@/api/api.config'
import { useToast } from '@atoms/use-toast'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { SISClassFeed } from '@/types/SIS/SISClassFeed'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@atoms/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@atoms/select'
import useAttendanceClassForm from './hooks/use-attendance-class-form'
import { Popover, PopoverContent, PopoverTrigger } from '@atoms/popover'
import { cn } from '@/core/utils/shadcn-utils'
import { format } from 'date-fns'
import { Calendar } from '@atoms/calendar'
import { useTeacher } from '@/lib/teacher/teacher-provider'
import { useLocales } from '@/core/hooks'
import { useGetCourseClassById } from '@/api/courseClass/use-get-course-class-by-id-'
import useAttendanceCourseClassForm from './hooks/use-attendance-course-class-form'
import AlertStatus from '@molecules/alert-status'
import { Combobox, ComboboxItemsType } from '@atoms/combobox'

type Props = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    onCreate?: (data: { courseClass?: string; period?: string }) => void
  }
export default function CreateRecordCourseClassModal({
  className,
  children,
  onCreate,
}: Props) {
  const [open, setOpen] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const { mutate } = useSWRConfig()
  const [searchParams] = useSearchParams()
  const { form, error } = useAttendanceCourseClassForm()
  const { toast } = useToast()
  const navigate = useNavigate()
  const { t } = useLocales()
  const { courseClasses } = useTeacher()
  const { courseClass } = useGetCourseClassById(
    {
      classId: form.watch('class'),
      isAttendance: true,
    },
    !form.watch('class'),
  )
  // console.log(form.watch('class'));
  const CourseClassesOptions = useMemo<ComboboxItemsType>(
    () =>
      (courseClasses || []).map((c) => ({
        label: c.title,
        value: c.name,
      })),
    [JSON.stringify(courseClasses)],
  )

  const PeriodOptions = useMemo<ComboboxItemsType>(
    () =>
      (courseClass?.timetable_day_row_class || []).map((p) => ({
        label: p.timetable_column_row_title,
        value: p.timetable_day_row_class,
      })),
    [JSON.stringify(courseClass)],
  )

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    form.reset()
  }

  const handleSubmitForm = () => {
    form.trigger()
    if (form.formState.isValid) {
      onCreate?.({
        courseClass: form.watch('class'),
        period: form.watch('period'),
      })
    }
  }

  useEffect(() => {
    const course_class_id = searchParams.get('class')
    if (course_class_id) {
      form.setValue('class', course_class_id)
    }
  }, [open])

  useEffect(() => {
    form.resetField('period')
  }, [form.watch('class')])

  // useEffect(() => {
  //   if (error) {
  //     toast({
  //       title: error.message || 'Error',
  //       description: typeof error === 'string' ? error : error.exception,
  //       variant: 'destructive',
  //     })
  //   }
  // }, [JSON.stringify(error)])

  return (
    <Dialog open={open} onOpenChange={handleOpenChange} >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="top-[10%] translate-y-0 flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {t('components.modals.create_attendance_subject.heading')}
          </DialogTitle>
          <DialogDescription>
            {t('components.modals.create_attendance_subject.description')}
          </DialogDescription>
        </DialogHeader>
        <div className="px-2">
          <Form {...form}>
            <form className="space-y-3">
              <FormField
                control={form.control}
                name="class"
                render={({ field, formState: { isSubmitting } }) => (
                  <FormItem>
                    <FormLabel htmlFor="input-status basis-[1/2]">
                      <span>{t('components.inputs.class.label')}</span>
                      <span className="ml-0.5 text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Combobox
                        className="w-full"
                        dropdownClassName="min-w-[200px]"
                        items={CourseClassesOptions}
                        placeholder={
                          courseClass &&
                          courseClass?.timetable_day_row_class.length > 0
                            ? t('components.inputs.filter_class.label')
                            : t('components.inputs.filter_class.empty')
                        }
                        emptyContent={t('components.inputs.filter_class.empty')}
                        searchPlaceholder={t(
                          'components.inputs.filter_class.search_placeholder',
                        )}
                        value={field.value}
                        onSelect={field.onChange}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="period"
                render={({ field, formState: { isSubmitting } }) => (
                  <FormItem>
                    <FormLabel htmlFor="input-status basis-[1/2]">
                      <span>{t('components.inputs.period.label')}</span>
                      <span className="ml-0.5 text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Combobox
                        className="w-full"
                        dropdownClassName="min-w-[200px]"
                        items={PeriodOptions}
                        placeholder={
                          courseClass &&
                          courseClass?.timetable_day_row_class.length > 0
                            ? t('components.inputs.period.placeholder')
                            : t('components.inputs.period.empty')
                        }
                        emptyContent={t('components.inputs.filter.empty')}
                        searchPlaceholder={t(
                          'components.inputs.filter.search_placeholder',
                        )}
                        disabled={
                          courseClass?.timetable_day_row_class.length === 0
                        }
                        value={field.value}
                        onSelect={field.onChange}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter className="flex justify-end">
          <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
            {t('components.buttons.cancel')}
          </Button>
          <Button
            type="button"
            onClick={handleSubmitForm}
            disabled={!form.formState.isValid}
          >
            {/* {form.formState.isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )} */}
            {t('components.buttons.create')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
