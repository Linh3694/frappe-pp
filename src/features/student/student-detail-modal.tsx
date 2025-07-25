import { HTMLAttributes, useState, type FC } from 'react'
import { cn } from '@/core/utils/shadcn-utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@atoms/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@atoms/tabs'
import { useLocales, useResponsive } from '@/core/hooks'
import { format } from 'date-fns'
import { Avatar, AvatarFallback, AvatarImage } from '@atoms/avatar'
import { genAvatarDefault, getInitials, toCapitalize } from '@/lib/utils/common'
import { Separator } from '@atoms/separator'
import {
  Cake,
  EnvelopeSimple,
  GenderFemale,
  GenderMale,
  Tray,
} from 'phosphor-react'
import {
  PersonListItem,
  PersonListSkeletonItem,
} from '@molecules/person-list-item'
import { useGetStudentById } from '@/api/student/use-get-student-by-id'
import Announcement from '@molecules/announcement'

export type StudentDetailModalProps = HTMLAttributes<HTMLDivElement> & {
  disabled?: boolean
  studentId?: string
}

export const StudentDetailModal: FC<StudentDetailModalProps> = ({
  className,
  disabled,
  children,
  studentId,
}) => {
  const { t } = useLocales()
  const { isDesktop } = useResponsive()
  const [open, setOpen] = useState(false)
  const { student, isValidating } = useGetStudentById(studentId, !studentId)

  return (
    <Dialog open={open} onOpenChange={($open) => !disabled && setOpen($open)}>
      <DialogTrigger className="text-start">{children}</DialogTrigger>
      <DialogContent
        className={cn('w-[640px] max-w-[90vw] rounded-lg', className)}
      >
        <DialogHeader className="text-xl font-bold text-primary">
          <DialogTitle>{t('common.student_info')}</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">
              {t('common.personal_information')}
            </TabsTrigger>
            <TabsTrigger value="family">{t('common.family')}</TabsTrigger>
          </TabsList>
          <TabsContent value="info">
            {isValidating && <PersonListSkeletonItem className="my-5" />}
            {!isValidating && (
              <div className="my-5 flex flex-wrap gap-5">
                <div className="flex basis-full justify-center sm:basis-[100px]">
                  <Avatar className="h-20 w-20 border">
                    <AvatarImage
                      className="object-cover"
                      src={genAvatarDefault(student?.person.full_name)}
                    />
                    <AvatarFallback className="bg-brand-secondary text-2xl font-light text-white">
                      {getInitials(student?.person.full_name || '')}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-bold text-primary">
                        {student?.person.full_name}
                      </p>
                      {student?.person.gender === 'Male' ? (
                        <GenderMale
                          className="text-brand-blue"
                          weight="bold"
                          size={20}
                        />
                      ) : (
                        <GenderFemale
                          className="text-brand-red"
                          weight="bold"
                          size={20}
                        />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {`${student?.person.wellspring_student_code} - ${t('common.class_c', { class: student?.class.short_title })}`}
                    </p>
                  </div>
                  <Separator className="my-5" />
                  <div className="flex flex-col gap-5">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <EnvelopeSimple
                          size={20}
                          className="font-bold text-brand-secondary"
                        />
                        <span className="text-sm text-muted-foreground/70">
                          {t('common.email')}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {student?.person.email || t('common.unknown')}
                      </p>
                    </div>

                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <Cake
                          size={20}
                          className="font-bold text-brand-secondary"
                        />
                        <span className="text-sm text-muted-foreground/70">
                          {t('common.date_of_birth')}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {(student?.person.date_of_birth &&
                          format(
                            student?.person.date_of_birth,
                            'dd/MM/yyyy',
                          )) ||
                          t('common.unknown')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="family">
            <div className="flex flex-col gap-3 py-5">
              {!isValidating &&
                student?.family_members.map((p) => (
                  <PersonListItem
                    key={p.person}
                    className="rounded-lg border p-3"
                    name={p.full_name}
                    avatar={p.avatar}
                    metadata={t('common.relationship_p', {
                      person:
                        (p.relationship_with_student &&
                          toCapitalize(p.relationship_with_student)) ||
                        t('common.unknown'),
                    })}
                  />
                ))}
              {!isValidating && student?.family_members.length === 0 && (
                <Announcement
                  icon={
                    <Tray size={80} className="opacity-20" weight="duotone" />
                  }
                  title={
                    <p className="text-lg font-normal">
                      {t(
                        'components.notification.no_members_in_family.heading',
                      )}
                    </p>
                  }
                />
              )}
              {isValidating &&
                Array.from(Array(3).keys()).map((i: number) => (
                  <PersonListSkeletonItem key={'sk' + i} />
                ))}
            </div>
            {/* <p className="w-full border p-3 text-center text-sm font-semibold text-muted-foreground">
              Nobody in here!
            </p> */}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
