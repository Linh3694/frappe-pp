import { useGetCourseClassesByUser } from '@/api/courseClass/use-get-course-classes-by-user'
import { useGetSchoolClassesByUser } from '@/api/schoolClass/use-get-school-classes-by-user'
import { SISCourseClass } from '@/types/SIS/SISCourseClass'
import { SISSchoolClass } from '@/types/SIS/SISSchoolClass'
import { SISStudent } from '@/types/SIS/SISStudent'
import { useFrappeGetCall } from 'frappe-react-sdk'
import React, { createContext, useEffect, useMemo, useState } from 'react'

interface TeacherContextProps {
  schoolClasses?: SISSchoolClass[]
  courseClasses?: SISCourseClass[]
}

export const TeacherContext = createContext<TeacherContextProps>({
  schoolClasses: undefined,
  courseClasses: undefined,
})

export const useTeacher = () => {
  const context = React.useContext(TeacherContext)
  if (!context) {
    throw new Error('useChildren must be used within a TeacherProvider')
  }
  return context
}

export const TeacherProvider = ({ children }: React.PropsWithChildren) => {
  const {
    data: schoolClasses,
    isLoading: schoolClassLoading,
    error: errSchoolClasses,
  } = useGetSchoolClassesByUser()
  const {
    data: courseClasses,
    isLoading: courseClassesLoading,
    error: errCourseClasses,
  } = useGetCourseClassesByUser()

  return (
    <>
      {useMemo(
        () => (
          <TeacherContext.Provider
            value={{
              schoolClasses: schoolClasses,
              courseClasses: courseClasses,
            }}
          >
            {children}
          </TeacherContext.Provider>
        ),
        [JSON.stringify(schoolClasses), JSON.stringify(courseClasses)],
      )}
    </>
  )
}
