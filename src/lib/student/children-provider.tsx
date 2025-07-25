import { SISStudent } from '@/types/SIS/SISStudent'
import { useFrappeGetCall } from 'frappe-react-sdk'
import React, { createContext, useEffect, useState } from 'react'

export interface SISChildren {
  avatar: string
  email: string
  full_name: string
  person_id: string
  school_class_id: string
  school_class_short_title: string
  school_class_title: string
  wellspring_student_code: string
}
interface ChildrenContextProps {
  current?: SISChildren
  students: SISChildren[]
  switchStudent: (id: string) => void
}

export const ChildrenContext = createContext<ChildrenContextProps>({
  students: [],
  switchStudent: () => {},
})

export const useChildren = () => {
  const context = React.useContext(ChildrenContext)
  if (!context) {
    throw new Error('useChildren must be used within a ChildrenProvider')
  }
  return context
}

export const ChildrenProvider = ({ children }: React.PropsWithChildren) => {
  const [students, setStudents] = useState<SISChildren[]>([])
  const [current, setCurrent] = useState<SISChildren>()
  const { data, error } = useFrappeGetCall<{ message: SISChildren[] }>(
    'parent_portal.api.sis_student.student.get_children',
    undefined,
    'get_children',
  )

  const switchStudent = (studentId: string) => {
    setCurrent(students.find((s) => s.person_id === studentId))
  }

  useEffect(() => {
    if (data?.message) {
      setCurrent(data?.message[0])
      setStudents(data?.message)
    }
  }, [JSON.stringify(data?.message)])

  return (
    <ChildrenContext.Provider
      value={{
        current,
        students,
        switchStudent,
      }}
    >
      {children}
    </ChildrenContext.Provider>
  )
}
