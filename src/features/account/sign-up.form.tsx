import {
  FormEvent,
  FormEventHandler,
  HTMLAttributes,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FC,
} from 'react'
import { cn } from '@/core/utils/shadcn-utils'
import { StepItem, Stepper } from '@molecules/stepper'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@atoms/tabs'
import { Input } from '@atoms/input'
import { InputGroup } from '@molecules/input-group'
import {
  ArrowLeft,
  CalendarIcon,
  Check,
  CircleAlert,
  CircleCheck,
  Loader2,
  Search,
} from 'lucide-react'
import { PersonListItem } from '@molecules/person-list-item'
import { Checkbox } from '@atoms/checkbox'
import { Button } from '@atoms/button'
import {
  Binoculars,
  CaretLeft,
  CaretRight,
  CheckCircle,
  Circle,
  PaperPlane,
  PaperPlaneTilt,
  Plus,
  PlusCircle,
  Receipt,
  Tray,
  XCircle,
} from 'phosphor-react'
import { Combobox } from '@atoms/combobox'
import DateTimePicker from '@molecules/date-time-picker'
import {
  SelectDistricts,
  SelectProvinces,
  SelectWards,
} from '@molecules/select-provinces'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@atoms/form'
import { useSignUp } from './hooks/use-sign-up'
import { useLocales } from '@/core/hooks'
import { capitalizeAllWords, cleanPath } from '@/lib/utils/common'
import { SelectContries } from '@molecules/select-countries'
import { format } from 'date-fns'
import { useGetStudentsInFamilyByCode } from '@/api/student/use-get-students-in-family-by-code'
import { debounce } from 'lodash'
import { SelectRelationship } from '@molecules/select-relationship'
import Announcement from '@molecules/announcement'
import { useValidateEmail } from '@/api/account/use-validate-email'
import { SISPerson } from '@/types/SIS/SISPerson'
import { log } from 'console'
import {
  RegisterPayload,
  useRegistration,
} from '@/api/account/use-registration'
import moment from 'moment'
import { useModal } from '@/lib/shadcn/modal-provider'
import { useNavigate } from 'react-router-dom'
import routes from '@/config/routes'
import AlertStatus from '@molecules/alert-status'
import { ScrollArea } from '@atoms/scroll-area'
import { PDFReader } from '@molecules/pdf-reader'
import { PageChangeEvent } from '@react-pdf-viewer/core'
import env from '@/config/env'
import { REGEX } from '@/core/constant/regex'

export type SignUpFormProps = HTMLAttributes<HTMLDivElement> & {}

export const SignUpForm: FC<SignUpFormProps> = ({ className }) => {
  const navigate = useNavigate()
  const { t, currentLanguage } = useLocales()
  const [step, setStep] = useState<number>(0)
  const { form, handleSubmit } = useSignUp()
  const [payload, setPayload] = useState<RegisterPayload>()
  const { showModal, closeModal } = useModal()

  const tabItems = useMemo<StepItem[]>(
    () => [
      {
        label: capitalizeAllWords(t('common.student_matching')),
        value: 'connect',
      },
      {
        label: capitalizeAllWords(t('common.parent_information')),
        value: 'info',
      },
      {
        label: capitalizeAllWords(t('common.term_conditions')),
        value: 'term',
      },
    ],
    [currentLanguage],
  )

  const handleRegister = async () => {
    try {
      payload && (await handleSubmit(payload))
      showModal({
        type: 'success',
        title: t('components.notification.register_successful.heading'),
        desc: t('components.notification.register_successful.description'),
        closeText: t('components.buttons.close'),
        okText: t('components.buttons.back_to_login'),
        okOnClick: () => {
          closeModal()
          navigate(routes.login)
        },
      })
    } catch (error) {
      showModal({
        type: 'error',
        title: t('components.notification.register_failure.heading'),
        desc: t('components.notification.register_failure.description'),
        closeText: t('components.buttons.close'),
        okButton: false,
      })
    }
  }
  const handleChangeStep = (new_step: number) => {
    if (new_step >= 0 && new_step < tabItems.length) {
      setStep(new_step)
    }
  }

  return (
    <Tabs
      className={cn('flex h-full flex-col', className)}
      value={tabItems[step]?.value || ''}
    >
      <Stepper
        items={tabItems}
        // onClickStep={(value) =>
        //   value && setStep(tabItems.findIndex((i) => i.value === value))
        // }
      />
      <TabsContent
        className="flex-1 overflow-x-hidden"
        value="connect"
        forceMount
        hidden={step !== 0}
      >
        <StudentMatching
          step={step}
          changeStep={handleChangeStep}
          onNext={(data) => setPayload({ ...payload, ...data })}
        />
      </TabsContent>
      <TabsContent
        className="flex-1 overflow-x-hidden"
        value="info"
        forceMount
        hidden={step !== 1}
      >
        <ParentInformationForm
          step={step}
          changeStep={handleChangeStep}
          onNext={(data) => setPayload({ ...payload, ...data })}
        />
      </TabsContent>
      <TabsContent
        className="flex-1"
        value="term"
        forceMount
        hidden={step !== 2}
      >
        <TermConfirmation
          step={step}
          changeStep={handleChangeStep}
          onNext={handleRegister}
        />
      </TabsContent>
    </Tabs>
  )
}

export type StepContentType = {
  step?: number
  changeStep?: (step: number) => void
  onNext?: (data?: any) => void
}
let timeout: NodeJS.Timeout | null = null

export const StudentMatching = ({
  step,
  changeStep,
  onNext,
}: StepContentType) => {
  const navigate = useNavigate()
  const { t, currentLanguage } = useLocales()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [studentCode, setStudentCode] = useState<string>()
  const { students, isValidating } = useGetStudentsInFamilyByCode(
    studentCode,
    !studentCode,
  )
  const [relationship, setRelationship] = useState<string>()
  const [isValid, setIsValid] = useState<boolean>(false)

  const handleNextStep = () => {
    if (isValid) {
      step != undefined && changeStep?.(step + 1)
      onNext?.({
        family: students?.family,
        relationship_with_student: relationship,
      })
    }
  }

  const handleSearchStudent = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchInputRef.current && searchInputRef.current.value) {
      setStudentCode(searchInputRef.current.value.trim())
    }
  }

  useEffect(() => {
    if (relationship && students?.family) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [relationship, students?.family])

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-x-hidden px-1">
        <div className="flex flex-col gap-3">
          <div className="w-full">
            <label htmlFor="" className="text-sm font-bold text-primary">
              {t('components.inputs.search_students.label')}
            </label>
            <p className="mb-2 text-xs text-muted-foreground">
              {t('components.inputs.search_students.notice')}
            </p>
            <form
              className="flex gap-5"
              onSubmit={(e) => handleSearchStudent(e)}
            >
              <Input
                placeholder={t(
                  'components.inputs.search_students.placeholder_by_code',
                )}
                ref={searchInputRef}
                // suffix={}
                readOnly={isValidating}
              />
              <Button
                size="lg"
                style={{ pointerEvents: isValidating ? 'none' : 'all' }}
                type="submit"
              >
                {isValidating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Search size={15} className="mr-2 opacity-50" />
                )}
                <span>{t('components.buttons.search')}</span>
              </Button>
            </form>
          </div>
          {students?.children && (
            <div className="mt-2 flex items-center justify-between">
              <p className="flex items-center gap-2 text-sm text-primary">
                <span>{t('common.relationship_node')}</span>
                <SelectRelationship
                  placeholder="Chọn mối quan hệ"
                  searchable={false}
                  value={relationship}
                  onSelect={setRelationship}
                />
              </p>
            </div>
          )}

          {students?.children.map((s) => (
            <PersonListItem
              key={s.name}
              name={s.full_name || t('common.unknown')}
              metadata={`${s.date_of_birth && format(new Date(s.date_of_birth), 'dd/MM/yyyy')}`}
            />
          ))}
          {!students && !isValidating && studentCode !== undefined && (
            <Announcement
              icon={<Tray className="text-primary opacity-40" size={60} />}
              title={
                <p className="text-lg">
                  {t('components.notification.search_not_found.heading', {
                    keyword: studentCode,
                  })}
                </p>
              }
              subtitle={
                <p className="text-sm">
                  {t('components.notification.search_not_found.description')}
                </p>
              }
            />
          )}
        </div>
      </div>
      <div className="sticky bottom-0 mt-5 flex justify-between">
        <Button
          type="button"
          variant="outline"
          className="space-x-2"
          onClick={() => navigate(routes.login)}
        >
          <CaretLeft weight="regular" />
          <span>{t('components.buttons.back_to_login')}</span>
        </Button>
        <Button
          type="button"
          className="space-x-2"
          onClick={handleNextStep}
          disabled={!isValid}
        >
          <span>{t('components.buttons.next')}</span>
          <CaretRight weight="regular" />
        </Button>
      </div>
    </div>
  )
}

export const ParentInformationForm = ({
  step,
  changeStep,
  onNext,
}: StepContentType) => {
  const { t, currentLanguage } = useLocales()
  const { form } = useSignUp()
  const [email, setEmail] = useState<string>()
  const [birthday, setBirthday] = useState<string>('')
  const {
    result,
    person,
    error: mailError,
    isValidating: mailValidating,
  } = useValidateEmail(email, !email)

  const handleNextStep = async (data: any) => {
    console.log('DAtA', { ...data, person: person?.name })
    onNext?.({
      ...data,
      province: data.province ? JSON.parse(data.province).name : null,
      district: data.district ? JSON.parse(data.district).name : null,
      ward: data.ward ? JSON.parse(data.ward).name : null,
      person: person?.name,
    })
    step && changeStep?.(step + 1)
  }

  const handleChangeBirthday = (str_date: string) => {
    let current_date = form.watch('date_of_birth')
    const reg = new RegExp(REGEX.date)
    if (reg.test(str_date)) {
      try {
        let birth_date = moment(str_date, 'DD/MM/YYYY').toDate()
        return birth_date
      } catch (err) {
        return current_date
      }
    }
    return current_date
  }

  useEffect(() => {
    if (person) {
      form.reset((prev: any) => ({
        ...prev,
        ...{
          full_name: person.full_name,
          first_name: person.first_name,
          date_of_birth: person.date_of_birth
            ? new Date(person.date_of_birth)
            : new Date(),
          phone_number: person.phone_number?.replaceAll(' ', ''),
          email: person.email,
          company: person.company,
          job_title: person.job_title,
        },
      }))
    }
  }, [person])

  useEffect(() => {
    setTimeout(() => {
      if (!form.getFieldState('email').error) {
        setEmail(form.watch('email'))
      }
    }, 200)
  }, [form.watch('email')])

  useEffect(() => {
    setTimeout(() => {
      let birth_date = form.watch('date_of_birth')
      birth_date && setBirthday(format(birth_date, 'dd/MM/yyyy'))
    }, 200)
  }, [form.watch('date_of_birth')])

  useEffect(() => {
    form.setValue('district', undefined)
  }, [form.watch('province')])

  useEffect(() => {
    form.setValue('ward', undefined)
  }, [form.watch('district')])

  return (
    <Form {...form}>
      <form
        className="flex h-full flex-col gap-4"
        onSubmit={form.handleSubmit(handleNextStep)}
      >
        {person && (
          <AlertStatus
            type="info"
            message={t('components.notification.found_information.heading')}
            desc={t('components.notification.found_information.description')}
          />
        )}
        <div className="h-full overflow-x-hidden px-2 pb-5">
          <div className="flex flex-col gap-5">
            <div className="group-2">
              <h4 className="mb-5 font-bold text-primary">
                {t('common.contact_information')}
              </h4>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1">
                  <label
                    htmlFor=""
                    className="text-sm font-bold text-muted-foreground"
                  >
                    {t('components.inputs.email.label')}
                    <span className="text-xs text-brand-red">*</span>
                  </label>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field, formState: { isSubmitting } }) => (
                      <FormItem>
                        <FormControl>
                          <InputGroup
                            {...field}
                            inputClassName="pr-12"
                            placeholder={t(
                              'components.inputs.email.placeholder',
                            )}
                            // onBlur={()=>form.trigger("email")}
                            suffix={() => {
                              if (form.getFieldState('email').invalid) {
                                return (
                                  <CircleAlert
                                    className="mr-5 text-brand-red"
                                    size={20}
                                  />
                                )
                              } else if (form.getFieldState('email').isTouched)
                                return (
                                  <Check
                                    className="mr-5 text-brand-green"
                                    size={20}
                                  />
                                )
                              return null
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor=""
                    className="text-sm font-bold text-muted-foreground"
                  >
                    {t('components.inputs.phone.label')}{' '}
                    <span className="text-xs text-brand-red">*</span>
                  </label>
                  <FormField
                    control={form.control}
                    name="phone_number"
                    render={({ field, formState: { isSubmitting } }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={t(
                              'components.inputs.phone.placeholder',
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label
                    htmlFor=""
                    className="text-sm font-bold text-muted-foreground"
                  >
                    {t('components.inputs.address.label')}
                  </label>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field, formState: { isSubmitting } }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder={t(
                                'components.inputs.address.placeholder',
                              )}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
                      <FormField
                        control={form.control}
                        name="province"
                        render={({ field, formState: { isSubmitting } }) => (
                          <FormItem>
                            <FormControl>
                              <SelectProvinces
                                className="w-full"
                                value={field.value?.toString()}
                                onSelect={field.onChange}
                                placeholder={t(
                                  'components.inputs.province.placeholder',
                                )}
                              />
                            </FormControl>
                            {/* <FormMessage /> */}
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="district"
                        render={({ field, formState: { isSubmitting } }) => (
                          <FormItem>
                            <FormControl>
                              <SelectDistricts
                                className="w-full"
                                province={
                                  JSON.parse(form.watch('province') || '{}')
                                    ?.code
                                }
                                value={field.value?.toString()}
                                onSelect={field.onChange}
                                placeholder={t(
                                  'components.inputs.district.placeholder',
                                )}
                              />
                            </FormControl>
                            {/* <FormMessage /> */}
                          </FormItem>
                        )}
                      />
                      {/* <SelectDistricts province={1} /> */}
                      <FormField
                        control={form.control}
                        name="ward"
                        render={({ field, formState: { isSubmitting } }) => (
                          <FormItem>
                            <FormControl>
                              <SelectWards
                                className="w-full"
                                district={
                                  JSON.parse(form.watch('district') || '{}')
                                    ?.code
                                }
                                value={field.value?.toString()}
                                onSelect={field.onChange}
                                placeholder={t(
                                  'components.inputs.ward.placeholder',
                                )}
                              />
                            </FormControl>
                            {/* <FormMessage /> */}
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor=""
                    className="text-sm font-bold text-muted-foreground"
                  >
                    {t('components.inputs.company_name.label')}
                  </label>
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field, formState: { isSubmitting } }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={t(
                              'components.inputs.company_name.placeholder',
                            )}
                          />
                        </FormControl>
                        {/* <FormMessage /> */}
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor=""
                    className="text-sm font-bold text-muted-foreground"
                  >
                    {t('components.inputs.job_title.label')}
                  </label>
                  <FormField
                    control={form.control}
                    name="job_title"
                    render={({ field, formState: { isSubmitting } }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={t(
                              'components.inputs.job_title.placeholder',
                            )}
                          />
                        </FormControl>
                        {/* <FormMessage /> */}
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="group-1">
              <h4 className="mb-5 font-bold text-primary">
                {t('common.personal_information')}
              </h4>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1">
                  <label
                    htmlFor=""
                    className="text-sm font-bold text-muted-foreground"
                  >
                    {t('components.inputs.full_name.label')}
                    <span className="text-xs text-brand-red">*</span>
                  </label>
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field, formState: { isSubmitting } }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={t(
                              'components.inputs.full_name.placeholder',
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor=""
                    className="text-sm font-bold text-muted-foreground"
                  >
                    {t('components.inputs.name.label')}
                    <span className="text-xs text-brand-red">*</span>
                  </label>
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field, formState: { isSubmitting } }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={t(
                              'components.inputs.name.placeholder',
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor=""
                    className="text-sm font-bold text-muted-foreground"
                  >
                    {t('components.inputs.date_of_birth.label')}
                  </label>
                  <FormField
                    control={form.control}
                    name="date_of_birth"
                    render={({ field, formState: { isSubmitting } }) => (
                      <FormItem>
                        <FormControl>
                          <InputGroup
                            // variant={'outline'}
                            inputClassName={cn(
                              'w-full justify-between text-left font-normal',
                            )}
                            onChange={(e) => {
                              setBirthday(e.target.value)
                              field.onChange(
                                handleChangeBirthday(e.target.value),
                              )
                            }}
                            onBlur={(e) => {
                              const curDate = form.watch('date_of_birth')
                              if (curDate) {
                                setBirthday(format(curDate, 'dd/MM/yyyy'))
                              }
                            }}
                            suffix={
                              <DateTimePicker
                                value={field.value}
                                onChange={(d) =>
                                  field.onChange(
                                    handleChangeBirthday(
                                      format(d, 'dd/MM/yyyy'),
                                    ),
                                  )
                                }
                                contentProps={{ align: 'end' }}
                                disabled={{
                                  after: new Date(),
                                }}
                              >
                                <CalendarIcon className="mr-4 h-4 w-4 cursor-pointer" />
                              </DateTimePicker>
                            }
                            placeholder={'MM/DD/YYYY'}
                            value={birthday}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor=""
                    className="text-sm font-bold text-muted-foreground"
                  >
                    {t('components.inputs.national.label')}
                  </label>
                  <FormField
                    control={form.control}
                    name="nationality"
                    render={({ field, formState: { isSubmitting } }) => (
                      <FormItem>
                        <FormControl>
                          <SelectContries
                            className="w-full"
                            placeholder={t(
                              'components.inputs.national.placeholder',
                            )}
                            onSelect={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 flex justify-between">
          <Button
            type="button"
            className="space-x-2"
            variant="outline"
            onClick={() => step && step > 0 && changeStep?.(step - 1)}
          >
            <CaretLeft weight="regular" />
            <span>{t('components.buttons.back')}</span>
          </Button>
          <Button type="submit" className="space-x-2">
            <span>{t('components.buttons.next')}</span>
            <CaretRight weight="regular" />
          </Button>
        </div>
      </form>
    </Form>
  )
}

export const TermConfirmation = ({
  step,
  changeStep,
  onNext,
}: StepContentType) => {
  const { t, currentLanguage } = useLocales()
  const [isAccept, setIsAccept] = useState(false)
  const [isRead, setIsRead] = useState(false)

  const handleLastStep = () => {
    if (isAccept && isRead) {
      onNext?.()
    }
  }

  const handleChangePage = (e: PageChangeEvent) => {
    if (!isRead && e.currentPage + 1 === e.doc.numPages) {
      setIsRead(true)
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="relative flex-1 ">
        <div className="absolute h-full w-full">
          <ScrollArea className="h-full border p-2">
            <PDFReader
              url={`${env.ASSET_URL}/static/sample.pdf`}
              onChangePage={handleChangePage}
            />
          </ScrollArea>
        </div>
      </div>
      <label
        htmlFor="accept"
        className={cn('mt-5 inline-flex cursor-pointer items-center gap-2', {
          'opacity-50': !isRead,
        })}
      >
        <Checkbox
          id="accept"
          checked={isAccept}
          onCheckedChange={(checked) => setIsAccept(checked as boolean)}
          disabled={!isRead}
        />
        <span className="text-xs">
          {t('components.notification.accept_term.description', {
            object: '',
          })}
          <b>Terms & Conditions</b>
        </span>
      </label>
      <div className="sticky bottom-0 mt-5 flex justify-between">
        <Button
          type="button"
          className="space-x-2"
          variant="outline"
          onClick={() => step && step > 0 && changeStep?.(step - 1)}
        >
          <CaretLeft weight="regular" />
          <span>{t('components.buttons.back')}</span>
        </Button>
        <Button
          type="button"
          className="space-x-2"
          onClick={handleLastStep}
          disabled={!isAccept}
        >
          <span>{t('components.buttons.submit')}</span>
          <PaperPlaneTilt weight="regular" />
        </Button>
      </div>
    </div>
  )
}
