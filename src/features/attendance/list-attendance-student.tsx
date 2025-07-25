import {
  HTMLAttributes,
  memo,
  ReactNode,
  useEffect,
  useMemo,
  useState,
  type FC,
} from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@atoms/avatar'
import { Pencil, PencilSimpleLine, Plus } from 'phosphor-react'
import { Button } from '@atoms/button'
import AddReasonModal from './add-reason-modal'
import { cn } from '@/core/utils/shadcn-utils'
import { AttendanceStatusSwitcher } from './attendance-status-switcher'
import { AttendanceCode } from '@/types/Extends/Attendance'
import { ParticipantExtend } from '@/types/Extends/Person'
import { format } from 'date-fns'
import { useLocales } from '@/core/hooks'
import { genAvatarDefault } from '@/lib/utils/common'

type AttendanceItemData = {
  status?: AttendanceCode
  reason?: string
}

export type AttendanceData = Record<string, AttendanceItemData>

export type ListAttendanceStudentProps = {
  students?: ParticipantExtend[]
  onChangeAttendance?: (attendance: AttendanceData) => void
  filterItem?: (id: string) => boolean
}

export const ListAttendanceStudent: FC<ListAttendanceStudentProps> = memo(
  ({ students, onChangeAttendance, filterItem }) => {
    const [attendance, setAttendance] = useState<AttendanceData>()

    const handleUpdateAttendance = (id: string, data: AttendanceItemData) => {
      const new_attendance = { ...attendance }
      new_attendance[id] = { ...new_attendance[id], ...data }
      setAttendance(new_attendance)
      onChangeAttendance?.(new_attendance)
    }

    useEffect(() => {
      if (students && !attendance) {
        const new_attendance = students?.reduce<AttendanceData>(
          (prev, item) => {
            if (item.role === 'Student') {
              prev[item.person] = {
                status: AttendanceCode.PRESENT,
              }
            }
            return prev
          },
          {},
        )
        setAttendance(new_attendance)
        onChangeAttendance?.(new_attendance)
      }
    }, [JSON.stringify(students)])

    return (
      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {students
          ?.filter((p) => p.role === 'Student')
          .map((student) => (
            <AttendanceStudentItem
              key={student.person}
              id={student.person}
              avatar={student.avatar}
              name={student.full_name}
              birthday={student.date_of_birth}
              onChangeStatus={(status) =>
                handleUpdateAttendance(student.person, { status })
              }
              onChangeReason={(reason) =>
                handleUpdateAttendance(student.person, { reason })
              }
              hidden={!filterItem?.(student.name)}
            />
          ))}
      </div>
    )
  },
)

type AttendanceStudentItemProps = HTMLAttributes<HTMLDivElement> & {
  id?: string
  avatar?: string
  name?: string
  birthday?: string
  onChangeStatus?: (status: AttendanceCode) => void
  onChangeReason?: (reason: string) => void
}

export const AttendanceStudentItem: FC<AttendanceStudentItemProps> = ({
  className,
  id,
  avatar,
  name,
  birthday,
  onChangeStatus,
  onChangeReason,
  hidden,
}) => {
  const { t } = useLocales()
  const [reason, setReason] = useState<string>()

  const handleChangeReason = (text: string) => {
    setReason(text)
    onChangeReason?.(text)
  }

  return (
    <div
      id={id}
      className={cn(
        'flex flex-col gap-2 rounded-xl border bg-card px-2 py-10 text-center',
        {
          hidden: hidden,
        },
      )}
    >
      <Avatar className="mx-auto h-28 w-28 border bg-card-foreground">
        <AvatarImage
          className="w-full object-cover"
          src={avatar || genAvatarDefault(name)}
        />
        <AvatarFallback>{name}</AvatarFallback>
      </Avatar>
      <div className="mb-3 space-y-1">
        <p className="text-xl font-bold text-primary">{name}</p>
        <p className="text-sm text-muted-foreground">
          {birthday && format(birthday, 'dd/MM/yyyy')}
        </p>
      </div>
      <div className="flex flex-col items-center gap-5">
        <AttendanceStatusSwitcher
          name={id}
          //   value={status}
          onChange={(v) => {
            onChangeStatus?.(v)
          }}
          defaultValue={AttendanceCode.PRESENT}
        />
       
        <AddReasonModal onSave={handleChangeReason}>
          <Button
            className="inline-flex gap-2 rounded-full hover:border-primary hover:text-primary"
            variant="outline"
          >
            {reason ? <PencilSimpleLine /> : <Plus />}
            {reason
              ? t('components.buttons.edit_reason')
              : t('components.buttons.add_reason')}
          </Button>
        </AddReasonModal>
        {reason &&<p className="text-xs line-clamp-1" title={reason}>{t('common.reason_t',{text:reason})}</p>}
      </div>
    </div>
  )
}
