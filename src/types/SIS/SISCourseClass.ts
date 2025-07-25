import { SISCourseClassPerson } from './SISCourseClassPerson'
import { SISTimetableDayRowClass } from './SISTimetableDayRowClass'

export interface SISCourseClass{
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
	/**	Title : Data	*/
	title: string
	/**	Short Title : Data	*/
	short_title: string
	/**	Description : Small Text	*/
	description?: string
	/**	Enrollment Min : Int	*/
	enrollment_min?: number
	/**	Enrollment Max : Int	*/
	enrollment_max?: number
	/**	Class Type : Select	*/
	class_type: "School Class" | "Elective Class" | "School Club" | "Other"
	/**	Attendance : Check	*/
	attendance: 0 | 1
	/**	From : Select	*/
	get_from?: "School Class" | "Grade Level"
	/**	School Class : Link - SIS School Class	*/
	from_school_class?: string
	/**	Grade Level : Link - SIS School Grade Level	*/
	from_grade_level?: string
	/**	Participants : Table - SIS Course Class Person	*/
	participants?: SISCourseClassPerson[]
	/**	Total Students : Int	*/
	total_students?: number
	/**	Timetable : Link - SIS Timetable	*/
	timetable?: string
	/**	Periods : Table - SIS Timetable Day Row Class	*/
	timetable_day_row_class?: SISTimetableDayRowClass[]
}