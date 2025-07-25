import { HTMLAttributes, PropsWithChildren, useState, type FC } from 'react'
import { cn } from '@/core/utils/shadcn-utils'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@atoms/dialog'
import { useLocales } from '@/core/hooks'
import { useGetSchoolClassById } from '@/api/schoolClass/use-get-school-class-by-id-'
import { StudentList } from '@features/student/student-list' 

export type SchoolClassDetailModalProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    disabled?: boolean
    classId?: string
  }

export const SchoolClassDetailModal: FC<SchoolClassDetailModalProps> = ({
  className,
  children,
  disabled = false,
  classId,
}) => {
  const { t } = useLocales()
  const { schoolClass: classData } = useGetSchoolClassById(classId, !classId)

  //   const { isDesktop } = useResponsive()
  const [open, setOpen] = useState(false)

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
          <DialogTitle className="font-bold text-xl text-primary">Danh sách {t('common.list_student_c',{class:classData?.short_title})}</DialogTitle>
        </DialogHeader>
        <div className="w-full">
          {/* <p className="mb-2 text-primary font-bold">Danh sách lớp 3.5</p> */}
          <StudentList list={classData?.participants.map((p)=>({
            id: p.person,
            name: p.full_name,
            avatar: p.avatar,
            dateOfBirth: new Date(p.date_of_birth)
          }))}/>
        </div>
      </DialogContent>
    </Dialog>
  )
}
