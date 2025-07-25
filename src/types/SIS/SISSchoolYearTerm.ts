
export interface SISSchoolYearTerm{
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
	/**	First Day : Date	*/
	first_day: string
	/**	Last Day : Date	*/
	last_day: string
}