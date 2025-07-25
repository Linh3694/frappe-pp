
export interface SISTimetableDayDate{
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
	/**	Timetable Day : Link - SIS Timetable Day	*/
	timetable_day: string
	/**	Date : Date	*/
	date: string
}