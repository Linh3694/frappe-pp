
export interface SISTimetableSchedulingTool{
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
	/**	School Year Term : Link - SIS School Year Term	*/
	school_year_term?: string
	/**	First day : Date	*/
	first_day: string
	/**	Reschedule? : Check	*/
	reschedule?: 0 | 1
	/**	Timetable : Link - SIS Timetable	*/
	timetable: string
	/**	Last day : Date	*/
	last_day: string
}