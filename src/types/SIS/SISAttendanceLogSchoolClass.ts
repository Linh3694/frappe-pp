import { SISAttendanceLogPerson } from './SISAttendanceLogPerson'

export interface SISAttendanceLogSchoolClass{
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
	/**	School Class  : Link - SIS School Class	*/
	school_class: string
	/**	Person Taker : Link - SIS Person	*/
	person_taker: string
	/**	Date : Date	*/
	date?: string
	/**	Timestamp Taken : Time	*/
	timestamp_taken?: string
	/**	Direction : Select	*/
	direction: "In" | "Out"
	/**	Student List : Table - SIS Attendance Log Person	*/
	student_list?: SISAttendanceLogPerson[]
}