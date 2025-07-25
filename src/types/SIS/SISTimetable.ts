import { SISTimetableDay } from './SISTimetableDay'

export interface SISTimetable{
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
	/**	Title : Data	*/
	title: string
	/**	Short Title : Data	*/
	short_title: string
	/**	Status : Select	*/
	status: "Active" | "Inactive"
	/**	Grade Level List : Data	*/
	grade_level_list: string
	/**	Timetable Days : Table - SIS Timetable Day	*/
	timetable_days?: SISTimetableDay[]
}