import { useEffect, useState, type FC } from 'react'
import { Permission } from '@/core/utils/permission'
import { createPage } from '@/core/utils/route-guard'
import { useLocales, useResponsive } from '@/core/hooks'
import ForbiddenState from '@features/states/forbbiden-state'
import ContentPageLayout from '@templates/content-page.layout'
import { Book, Plus, PlusCircle, Rows, UsersFour } from 'phosphor-react'
import CreateAttendanceRecord from '@features/attendance/create-attendance-record'
import AttendanceFilter, {
  AttendanceFilterValues,
} from '@features/attendance/attendance-filter'
import { Button } from '@atoms/button'
import CreateRecordClassModal from '@features/attendance/create-record-class-modal'
import ListAttendanceClassRecord from '@features/attendance/list-attendance-class-record'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { format } from 'date-fns'
import { useTeacher } from '@/lib/teacher/teacher-provider'
import { useAuthContext } from '@/lib/auth/auth-provider'
import { cleanPath } from '@/lib/utils/common'

const PERMISSIONS: Permission[] = []
const DISPLAY_NAME = 'Attendance-class-records'

export const Route: FC = () => {
  const { t } = useLocales()
  const { isDesktop } = useResponsive()
  const { prefixRoute } = useAuthContext()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { schoolClasses } = useTeacher()
  const [filter, setFilter] = useState<AttendanceFilterValues>()

  useEffect(() => {
    if (filter) {
      setSearchParams((prevParams) => {
        prevParams.delete('date')
        prevParams.delete('class')
        if (filter?.date) {
          prevParams.append('date', format(filter?.date, 'yyyy-MM-dd'))
        }
        if (filter?.classId) {
          prevParams.append('class', filter?.classId.toString())
        }
        return prevParams
      })
    }
  }, [JSON.stringify(filter)])

  useEffect(() => {
    if (!filter?.classId) {
      const defaultValues: AttendanceFilterValues = {
        date: new Date(searchParams.get('date') || new Date()),
        classId:
          searchParams.get('class') ||
          (schoolClasses && schoolClasses[0]?.name),
      }
      setFilter(defaultValues)
    }
  }, [JSON.stringify(schoolClasses)])

  return (
    <ContentPageLayout titlePage={t('common.attendance_by_classes')}>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col justify-between gap-3 md:flex-row">
          <AttendanceFilter
            className="sm:basis-1/2 md:basis-2/3"
            filterSubject={false}
            value={filter}
            onFilterChange={(filter) => setFilter(filter)}
          />
          <CreateRecordClassModal
            onCreate={({ schoolClass }) =>
              navigate(
                cleanPath(
                  `/${prefixRoute}/attendance/classes/new-record?class=${schoolClass}`,
                ),
              )
            }
          >
            <Button className="flex gap-2">
              <Plus size={16} /> {t('components.buttons.create_record')}
            </Button>
          </CreateRecordClassModal>
        </div>
        {<ListAttendanceClassRecord filter={filter} />}
      </div>
    </ContentPageLayout>
  )
}

const Component = createPage(Route, PERMISSIONS, <ForbiddenState />)

Route.displayName = `${DISPLAY_NAME}Page`
Component.displayName = DISPLAY_NAME

export { Component }
