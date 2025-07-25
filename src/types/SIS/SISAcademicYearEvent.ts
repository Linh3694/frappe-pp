
export interface SISAcademicYearEvent{
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
	/**	Title : Small Text	*/
	title: string
	/**	Description : Small Text	*/
	description?: string
	/**	Start Date : Date	*/
	start_date: string
	/**	End Date : Date	*/
	end_date: string
	/**	Enable : Check	*/
	enable?: 0 | 1
}