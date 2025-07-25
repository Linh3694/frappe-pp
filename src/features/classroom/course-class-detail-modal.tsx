import { HTMLAttributes, PropsWithChildren, useState, type FC } from 'react'
import { cn } from '@/core/utils/shadcn-utils'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@atoms/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@atoms/tabs'
import { useLocales } from '@/core/hooks'
import { useGetCourseClassById } from '@/api/courseClass/use-get-course-class-by-id-'
import { StudentList } from '@features/student/student-list'
import { Loader } from '@molecules/loader'


export type CourseClassDetailModalProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    disabled?: boolean
    classId?: string
  }

export const CourseClassDetailModal: FC<CourseClassDetailModalProps> = ({
  className,
  children,
  disabled = false,
  classId,
}) => {
  const [open, setOpen] = useState(false)
  const { t } = useLocales()
  const { courseClass: classData, isValidating } = useGetCourseClassById(
    { classId, isAttendance: true },
    !classId || !open,
  )

  //   const { isDesktop } = useResponsive()

  // console.log(classData?.participants.map((p)=>({
  //   name: p.full_name,
  //   avatar: p.avatar,
  //   dateOfBirth: p.date_of_birth
  // })));

  return (
    <Dialog open={open} onOpenChange={($open) => !disabled && setOpen($open)}>
      <DialogTrigger className="text-start" asChild>
        {children}
      </DialogTrigger>
      <DialogContent
        className={cn('w-[640px] max-w-[90vw] rounded-lg', className)}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">
            {t('common.list_student_c', { class: classData?.title })}
          </DialogTitle>
        </DialogHeader>
        <div className="w-full">
          {/* <p className="mb-2 text-primary font-bold">Danh sách lớp 3.5</p> */}
          <StudentList
            loading={isValidating}
            loader={<Loader />}
            list={classData?.participants.map((p) => ({
              id: p.person,
              name: p.full_name,
              avatar: p.avatar,
              dateOfBirth: new Date(p.date_of_birth),
            }))}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
