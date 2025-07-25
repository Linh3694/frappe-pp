
export interface SISTimetableDayRowClass{
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
	/**	Title : Data	*/
	title?: string
	/**	Description : Data	*/
	description?: string
	/**	Timetable Day : Link - SIS Timetable Day	*/
	timetable_day: string
	/**	Timetable Column : Data	*/
	timetable_column?: string
	/**	Timetable Column Row : Link - SIS Timetable Column Row	*/
	timetable_column_row: string
}