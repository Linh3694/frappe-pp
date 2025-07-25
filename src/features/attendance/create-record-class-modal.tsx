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
import { Combobox, ComboboxItemsType } from '@atoms/combobox'

type Props = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    onCreate?: (data: { schoolClass?: string }) => void
  }
export default function CreateRecordClassModal({
  className,
  children,
  onCreate,
}: Props) {
  const [open, setOpen] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const { mutate } = useSWRConfig()
  const [searchParams] = useSearchParams()
  const { form, error, reset } = useAttendanceClassForm()
  const { toast } = useToast()
  const navigate = useNavigate()
  const { t } = useLocales()
  const { schoolClasses } = useTeacher()

  const SchoolClassOptions = useMemo<ComboboxItemsType>(
    () =>
      (schoolClasses || []).map((c) => ({
        label: t('common.class_c', { class: c.short_title }),
        value: c.name,
      })),
    [JSON.stringify(schoolClasses)],
  )

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    // reset()
  }

  const handleSubmitForm = () => {
    onCreate?.({ schoolClass: form.watch('class') })
  }

  useEffect(() => {
    const school_class_id = searchParams.get('class')
    console.log(school_class_id)

    if (school_class_id) {
      form.setValue('class', school_class_id)
    }
  }, [open])

  useEffect(() => {
    if (error) {
      toast({
        title: error.message || 'Error',
        description: typeof error === 'string' ? error : error.exception,
        variant: 'destructive',
      })
    }
  }, [JSON.stringify(error)])

  return (
    <Dialog open={open} modal={true} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="top-[10%] translate-y-0 flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {t('components.modals.create_attendance_class.heading')}
          </DialogTitle>
          <DialogDescription>
            {t('components.modals.create_attendance_class.description')}
          </DialogDescription>
        </DialogHeader>
        <div className="px-2">
          <Form {...form}>
            <form className="space-y-3">
              <FormField
                // control={form.control}
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
                        items={SchoolClassOptions}
                        placeholder={t(
                          'components.inputs.filter_class.placeholder',
                        )}
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
            // disabled={form.formState.isSubmitting}
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
