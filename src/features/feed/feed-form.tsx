import React, {
  HTMLAttributes,
  ReactNode,
  forwardRef,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@atoms/form'
import { Input } from '@atoms/input'
import AlertStatus, { AlertContentType } from '@molecules/alert-status'
import { cn } from '@/core/utils/shadcn-utils'
import { Textarea } from '@atoms/textarea'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@atoms/select'
import DateTimePicker from '@molecules/date-time-picker'
import { Popover, PopoverContent, PopoverTrigger } from '@atoms/popover'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import moment from 'moment'
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  ImageSvgDraw,
} from '@molecules/file-uploader'
import { File } from 'phosphor-react'
import { formatBytes } from '@/lib/utils/common'
import { FrappeError } from 'frappe-react-sdk'
import { useTeacher } from '@/lib/teacher/teacher-provider'
import { useTranslation } from 'react-i18next'
import { Combobox, ComboboxItemsType } from '@atoms/combobox'

type Props = HTMLAttributes<HTMLDivElement> & {
  form: UseFormReturn<any>
  error: FrappeError | null
  handleSubmit: (data?: any, photos?: any) => Promise<any>
}

const FeedForm = forwardRef<HTMLFormElement, Props>(
  ({ className, form, error, handleSubmit }, ref) => {
    const { t } = useTranslation()
    const [alert, setAlert] = useState<AlertContentType>()
    const { schoolClasses, courseClasses } = useTeacher()

    const classOptions = useMemo<ComboboxItemsType>(() => {
      let options = []
      if (schoolClasses && schoolClasses?.length > 0) {
        options.push({
          heading: t('common.official_class'),
          children: (schoolClasses || []).map((c) => ({
            label: t('common.class_c', { class: c.short_title }),
            value: JSON.stringify({
              classType: 'School Class',
              classId: c.name,
            }),
          })),
        })
      }
      if (courseClasses && courseClasses?.length > 0) {
        options.push({
          heading: t('common.course_class'),
          children: (courseClasses || []).map((c) => ({
            label: c.title,
            value: JSON.stringify({
              classType: 'Course Class',
              classId: c.name,
            }),
          })),
        })
      }
      return options
    }, [JSON.stringify(schoolClasses), JSON.stringify(courseClasses)])

    const handleRemoveFile = (index: number) => {
      const arrPhotos = form.getValues('photos')
      arrPhotos.splice(index, 1)

      form.setValue('photos', arrPhotos)
    }

    useEffect(() => {
      if (error?.message) {
        setAlert({
          type: 'error',
          message: error.message || 'Error',
          desc: typeof error === 'string' ? error : error.exception,
        })
      }
    }, [JSON.stringify(error)])

    // useEffect(() => {
    //   const classId = form.watch('class')
    //   console.log(classId)

    //   if (schoolClasses?.find((c) => c.name === classId)) {
    //     form.setValue('class_type', 'School Class')
    //     return
    //   }
    //   if (courseClasses?.find((c) => c.name === classId)) {
    //     form.setValue('class_type', 'Course Class')
    //     return
    //   }
    // }, [form.watch('class')])

    return (
      <div className={cn(className)}>
        <Form {...form}>
          <form
            className="space-y-3"
            ref={ref}
            onSubmit={form.handleSubmit((data) =>
              handleSubmit(data, data.photos),
            )}
          >
            <AlertStatus
              message={alert?.message}
              desc={alert?.desc}
              type={alert?.type}
            />
            <div className="flex justify-end"></div>
            {/* <FormField
              control={form.control}
              name="class_type"
              render={({ field, formState: { isSubmitting } }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="class"
              render={({ field, formState: { isSubmitting } }) => (
                <FormItem>
                  <FormLabel htmlFor="input-title">
                    <span> {t('components.inputs.select_class.label')}</span>
                    <span className="ml-0.5 text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Combobox
                      className="w-full"
                      items={classOptions}
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
            <FormField
              control={form.control}
              name="title"
              render={({ field, formState: { isSubmitting } }) => (
                <FormItem>
                  <FormLabel htmlFor="input-title">
                    <span>{t('components.inputs.title.label')}</span>
                    <span className="ml-0.5 text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="input-title"
                      disabled={isSubmitting}
                      placeholder={t('components.inputs.title.placeholder')}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="photos"
              render={({ field, formState: { isSubmitting } }) => (
                <FormItem>
                  <FormLabel htmlFor="input-photos">
                    <span>
                      {t('components.inputs.photos.label')}
                      <span className="text-xs"></span>
                      <span className="ml-0.5 text-red-500">*</span>
                    </span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-3">
                      <FileUploader
                        value={field.value}
                        onValueChange={field.onChange}
                        dropzoneOptions={{
                          accept: {
                            'image/*': ['.jpg', '.jpeg', '.png', '.gif'],
                          },
                          maxFiles: 5,
                          maxSize: 1024 * 1024 * 4,
                          multiple: true,
                        }}
                        className="relative space-y-1"
                      >
                        <FileInput className="border border-dashed">
                          <ImageSvgDraw exts={['JPG', 'JPEG', 'PNG', 'GIF']} />
                        </FileInput>
                        <FileUploaderContent className="">
                          {form.watch('photos') &&
                            form.watch('photos').length > 0 &&
                            form
                              .watch('photos')
                              .map((file: File, i: number) => (
                                <FileUploaderItem key={i} index={i}>
                                  <div className="flex items-center space-x-3">
                                    {file.type && (
                                      <File
                                        className="text-brand-secondary"
                                        size={30}
                                      />
                                    )}
                                    {!file.type && (
                                      <div className="aspect-[4/3] w-[50px]">
                                        <img
                                          src={file.name}
                                          className="h-full w-full object-cover"
                                          alt={file.name}
                                        />
                                      </div>
                                    )}
                                    <div>
                                      <p className="line-clamp-1 text-sm">
                                        {file.name}
                                      </p>
                                      <p className="text-sm text-muted-foreground">
                                        {(file.size &&
                                          formatBytes(file.size)) ||
                                          'NaN'}
                                      </p>
                                    </div>
                                  </div>
                                </FileUploaderItem>
                              ))}
                        </FileUploaderContent>
                      </FileUploader>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <div className="flex gap-5">
              {/* <FormField
                control={form.control}
                name="status"
                render={({ field, formState: { isSubmitting } }) => (
                  <FormItem className="basis-1/2">
                    <FormLabel htmlFor="input-status">
                      <span>Status</span>
                      <span className="ml-0.5 text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Draft">Draft</SelectItem>
                          <SelectItem value="Waiting Approval">
                            Waiting approval
                          </SelectItem>
                          <SelectItem value="Public">Public</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name="public_time"
                render={({ field, formState: { isSubmitting } }) => (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="input-public-time">
                      <span>{t('components.inputs.public_time.label')}</span>
                      <span className="ml-0.5 text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        min={moment().format('YYYY-MM-DDTHH:mm:ss')}
                        id="input-title"
                        className="inline-block"
                        type="datetime-local"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            {/* ------------  */}
            <FormField
              control={form.control}
              name="description"
              render={({ field, formState: { isSubmitting } }) => (
                <FormItem>
                  <FormLabel htmlFor="input-description">
                    <span>
                      {t('components.inputs.description.label')}
                      <span className="ml-1 text-xs">
                        ({t('common.optional')})
                      </span>
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      id="input-description"
                      disabled={isSubmitting}
                      placeholder={t(
                        'components.inputs.description.placeholder',
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field, formState: { isSubmitting } }) => (
                <FormItem>
                  <FormLabel htmlFor="input-content">
                    <span>
                      {t('components.inputs.content.label')}
                      <span className="ml-1 text-xs">
                        ({t('common.optional')})
                      </span>
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      id="input-content"
                      disabled={isSubmitting}
                      rows={8}
                      placeholder={t('components.inputs.content.placeholder')}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <div className="flex justify-between py-2">
              <div className="flex gap-3 "></div>
            </div>
          </form>
        </Form>
      </div>
    )
  },
)

export default FeedForm
