
export interface SISTimetableDay{
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
	title: string
	/**	Short Title : Data	*/
	short_title: string
	/**	Timetable Column : Link - SIS Timetable Column	*/
	timetable_column: string
	/**	Weekday : Select	*/
	weekday: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun"
}