import { useEffect, useLayoutEffect, useMemo, useState, type FC } from 'react'

import ForbiddenState from '@features/states/forbbiden-state'
import { Permission } from '@/core/utils/permission'
import { createPage } from '@/core/utils/route-guard'
import {
  AttendanceData,
  ListAttendanceStudent,
} from '@features/attendance/list-attendance-student'
import AttendanceFilter from '@features/attendance/attendance-filter'
import ContentPageLayout from '@templates/content-page.layout'
import { Button } from '@atoms/button'
import { SliderAttendanceStudent } from '@features/attendance/slider-attendance-student'
import { useLocales, useResponsive } from '@/core/hooks'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@atoms/select'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useGetSchoolClassById } from '@/api/schoolClass/use-get-school-class-by-id-'
import { useCreateAttendanceSchoolClass } from '@/api/attendance/use-create-attendance-school-class'
import { AttendanceCode } from '@/types/Extends/Attendance'
import ConfirmModal from '@molecules/confirm-modal'
import { useAuthContext } from '@/lib/auth/auth-provider'
import { format } from 'date-fns'
import { useTeacher } from '@/lib/teacher/teacher-provider'
import { useGetCourseClassById } from '@/api/courseClass/use-get-course-class-by-id-'
import { useCreateAttendanceCourseClass } from '@/api/attendance/use-create-attendance-course-class'
import { cleanPath } from '@/lib/utils/common'
import { Combobox, ComboboxItemsType } from '@atoms/combobox'

const PERMISSIONS: Permission[] = []
const DISPLAY_NAME = 'AttendanceSubjectRecordDetail'

export const Route: FC = () => {
  const { t } = useLocales()
  const { isDesktop } = useResponsive()
  const navigate = useNavigate()
  const { prefixRoute } = useAuthContext()
  const [searchParams] = useSearchParams()
  const { courseClasses } = useTeacher()
  const { courseClass, error: errCourseClass } = useGetCourseClassById(
    { classId: searchParams.get('class'), isAttendance: true },
    !searchParams.get('class'),
  )

  const StudentsOptions = useMemo<ComboboxItemsType>(
    () => [
      {
        value: 'all',
        label: t('components.inputs.select_show_students.all_item'),
      },
      ...(courseClass?.participants || []).map((s) => ({
        label: s.full_name,
        value: s.person,
      })),
    ],
    [JSON.stringify(courseClass)],
  )

  const { handleCreate: createAttendanceCourseClass } =
    useCreateAttendanceCourseClass()
  const [attendance, setAttendance] = useState<AttendanceData>()
  const [filter, setFilter] = useState<string>('all')

  const handleSubmit = async () => {
    const course_class = searchParams.get('class')
    const timetable_day_row_class = searchParams.get('period')
    if (course_class && timetable_day_row_class && attendance) {
      try {
        await createAttendanceCourseClass({
          course_class,
          timetable_day_row_class,
          student_list:
            (attendance &&
              Object.keys(attendance).map((id) => ({
                person: id,
                attendance_code:
                  attendance[id].status || AttendanceCode.PRESENT,
                reason: attendance[id].reason,
              }))) ||
            [],
        })
        navigate(
          cleanPath(
            `/${prefixRoute}/attendance/subjects?date=${format(new Date(), 'yyyy-MM-dd')}&class=${course_class}`,
          ),
        )
      } catch (err) {}
    }
  }

  useEffect(() => {
    if (
      !courseClass &&
      errCourseClass &&
      courseClasses &&
      courseClasses?.length > 0
    ) {
      navigate(
        cleanPath(
          `/${prefixRoute}/attendance/subjects/new-record?class=${courseClasses[0].name}`,
        ),
      )
    }
  }, [JSON.stringify(errCourseClass), JSON.stringify(courseClasses)])

  return (
    <div className="relative flex min-h-full flex-col">
      <ContentPageLayout
        titlePage={t('common.new_record')}
        className="flex-1"
        containerFluid={!isDesktop}
      >
        {isDesktop && (
          <ListAttendanceStudent
            students={courseClass?.participants}
            filterItem={(id) => filter === 'all' || id === filter}
            onChangeAttendance={setAttendance}
          />
        )}
        {!isDesktop && (
          <SliderAttendanceStudent
            students={courseClass?.participants}
            onChangeAttendance={setAttendance}
          />
        )}
      </ContentPageLayout>
      <div className="sticky bottom-0 left-0  w-full border-t bg-background">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-3 p-2 md:px-10 md:py-4">
          {/* <AttendanceFilter
            filterClass={isDesktop}
            className="flex-1 sm:flex-none sm:basis-1/2"
          /> */}
          {(isDesktop && (
            <Combobox
              className="w-full sm:max-w-[300px]"
              dropdownClassName="min-w-[200px]"
              items={StudentsOptions}
              placeholder={t('components.inputs.filter_class.placeholder')}
              emptyContent={t('components.inputs.filter_class.empty')}
              searchPlaceholder={t(
                'components.inputs.filter_class.search_placeholder',
              )}
              value={filter}
              onSelect={setFilter}
            />
          )) || <span></span>}
          <ConfirmModal
            title="Are you sure?"
            subtitle="This action will create a new record attendance for today."
            onConfirm={handleSubmit}
          >
            <Button size="lg">{t('components.buttons.save_attendance')}</Button>
          </ConfirmModal>
        </div>
      </div>
    </div>
  )
}

const Component = createPage(Route, PERMISSIONS, <ForbiddenState />)

Route.displayName = `${DISPLAY_NAME}Page`
Component.displayName = DISPLAY_NAME

export { Component }
