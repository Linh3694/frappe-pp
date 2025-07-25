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
import { cleanPath } from '@/lib/utils/common'
import { Combobox, ComboboxItemsType } from '@atoms/combobox'

const PERMISSIONS: Permission[] = []
const DISPLAY_NAME = 'AttendanceClassRecordDetail'

export const Route: FC = () => {
  const { t } = useLocales()
  const { isDesktop } = useResponsive()
  const navigate = useNavigate()
  const { prefixRoute } = useAuthContext()
  const [searchParams] = useSearchParams()
  const { schoolClasses } = useTeacher()
  const { schoolClass, error: errSchoolClass } = useGetSchoolClassById(
    searchParams.get('class'),
    !searchParams.get('class'),
  )

  const StudentsOptions = useMemo<ComboboxItemsType>(
    () => [
      {
        value: 'all',
        label: t('components.inputs.select_show_students.all_item'),
      },
      ...(schoolClass?.participants || []).map((s) => ({
        label: s.full_name,
        value: s.person,
      })),
    ],
    [JSON.stringify(schoolClasses)],
  )

  const { handleCreate: createAttendanceSchoolClass } =
    useCreateAttendanceSchoolClass()
  const [attendance, setAttendance] = useState<AttendanceData>()
  const [filter, setFilter] = useState<string>('all')

  // console.log(filter)

  const handleSubmit = async () => {
    const school_class = searchParams.get('class')
    if (school_class && attendance) {
      try {
        await createAttendanceSchoolClass({
          school_class,
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
            `/${prefixRoute}/attendance/classes?date=${format(new Date(), 'yyyy-MM-dd')}&class=${school_class}`,
          ),
        )
      } catch (err) {}
    }
  }

  useEffect(() => {
    if (
      !schoolClass &&
      errSchoolClass &&
      schoolClasses &&
      schoolClasses?.length > 0
    ) {
      navigate(
        cleanPath(
          `/${prefixRoute}/attendance/classes/new-record?class=${schoolClasses[0].name}`,
        ),
      )
    }
  }, [JSON.stringify(errSchoolClass), JSON.stringify(schoolClasses)])

  return (
    <div className="relative flex min-h-full flex-col">
      <ContentPageLayout
        titlePage={t('common.new_record')}
        className="flex-1"
        containerFluid={!isDesktop}
      >
        {isDesktop && (
          <ListAttendanceStudent
            students={schoolClass?.participants}
            filterItem={(id) => filter === 'all' || id === filter}
            onChangeAttendance={setAttendance}
          />
        )}
        {!isDesktop && (
          <SliderAttendanceStudent
            students={schoolClass?.participants}
            onChangeAttendance={setAttendance}
          />
        )}
      </ContentPageLayout>
      <div className="sticky bottom-0 left-0  w-full border-t bg-background">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-3 py-2 md:py-4">
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
            title={t('components.modals.confirm_save_attendance.heading')}
            subtitle={t(
              'components.modals.confirm_save_attendance.description',
            )}
            cancelButtonText={t('components.buttons.cancel')}
            confirmButtonText={t('components.buttons.confirm')}
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
