import { SISSchoolClassPerson } from './SISSchoolClassPerson'

export interface SISSchoolClass{
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
	/**	School Grade Level : Link - SIS School Grade Level	*/
	school_grade_level: string
	/**	Title : Data	*/
	title: string
	/**	Short Title : Data	*/
	short_title: string
	/**	Participants : Table - SIS School Class Person	*/
	participants?: SISSchoolClassPerson[]
	/**	Total Students : Int	*/
	total_students?: number
}