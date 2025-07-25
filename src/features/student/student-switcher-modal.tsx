import { PropsWithChildren, ReactNode, useCallback, useContext, useState, type FC } from 'react'
import { Drawer, DrawerContent, DrawerTrigger } from '@atoms/drawer'
import { Avatar, AvatarFallback, AvatarImage } from '@atoms/avatar'
import { Check } from 'phosphor-react'
import { useLocales, useResponsive } from '@/core/hooks'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@atoms/dialog'
import { ChildrenContext, useChildren } from '@/lib/student/children-provider'
import UserProfileCard, { ProfileCardLarge, ProfileCardSmall } from '@molecules/user-profile-card'

export type Props = PropsWithChildren & {
  disabled?: boolean
}

export const StudentsSwitcherModal: FC<Props> = ({
  children,
  disabled = false,
}) => {
  const { t } = useLocales()
  const { isDesktop } = useResponsive()
  const [open, setOpen] = useState(false)
  const { current, students, switchStudent } = useChildren()

  const handleSwitchStudent = useCallback(
    (studentId: string) => {
      if (studentId && studentId !== current?.person_id) {
        switchStudent(studentId)
      }
      setOpen(false)
    },
    [JSON.stringify(current), JSON.stringify(students)],
  )

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={($open) => !disabled && setOpen($open)}>
        <DialogTrigger className="text-start" asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader className="font-semibold text-brand-secondary">
            <DialogTitle>{t('switch_student')}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              {students.map((student,key) => (
                <div
                  key={student.person_id+key}
                  className="flex cursor-pointer items-center rounded-md hover:bg-slate-100"
                  onClick={() => handleSwitchStudent(student.person_id)}
                >
                  <ProfileCardSmall
                    className="flex-1 bg-transparent"
                    avatar={student?.avatar}
                    avatarAlt={student?.full_name}
                    name={
                      <span className="text-brand-teal">
                        {student?.full_name}
                      </span>
                    }
                    subInfo={
                      <span className="text-muted-foreground">{`${t('class')} ${student?.school_class_short_title}`}</span>
                    }
                  />
                  {current?.person_id === student.person_id && (
                    <Check size={18} className="mx-2 text-brand-teal" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={($open) => !disabled && setOpen($open)}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="flex flex-col gap-2 p-4">
          <div className="text-gray-500">Switch student</div>
          <div className="flex flex-col gap-4">
            {students.map((student) => (
              <div
                key={student.person_id}
                className="flex cursor-pointer items-center rounded-md hover:bg-slate-100"
                onClick={() => handleSwitchStudent(student.person_id)}
              >
                <ProfileCardSmall
                  className="flex-1 bg-transparent"
                  avatar={student?.avatar}
                  avatarAlt={student?.full_name}
                  name={
                    <span className="text-brand-teal">
                      {student?.full_name}
                    </span>
                  }
                  subInfo={
                    <span className="text-muted-foreground">{`${t('class')} ${student?.school_class_short_title}`}</span>
                  }
                />
                {current?.person_id === student.person_id && (
                  <Check size={24} className="mx-2 text-brand-teal" />
                )}
              </div>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
