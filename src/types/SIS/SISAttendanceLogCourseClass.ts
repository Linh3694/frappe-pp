import { SISAttendanceLogPerson } from './SISAttendanceLogPerson'

export interface SISAttendanceLogCourseClass{
	creation: string
	name: string
	modified: string
	owner: string
	modified_by: string
	docstatus: 0 | 1 | 2
	parent?: string
	parentfield?: string
	parenttype?: string
	idx?: number
	/**	School Year : Link - SIS School Year	*/
	school_year: string
	/**	Course : Link - SIS Course	*/
	course: string
	/**	Course Class : Link - SIS Course Class	*/
	course_class: string
	/**	Select a period : Select	*/
	period?: string
	/**	Date : Date	*/
	date?: string
	/**	Direction : Select	*/
	direction: "In" | "Out"
	/**	Person Taker : Link - SIS Person	*/
	person_taker: string
	/**	Timetable Day Row Class : Link - SIS Timetable Day Row Class	*/
	timetable_day_row_class: string
	/**	Timestamp Taken : Time	*/
	timestamp_taken?: string
	/**	Student List : Table - SIS Attendance Log Person	*/
	student_list?: SISAttendanceLogPerson[]
}