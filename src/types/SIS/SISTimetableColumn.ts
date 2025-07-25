import { SISTimetableColumnRow } from './SISTimetableColumnRow'

export interface SISTimetableColumn{
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
	/**	Timetable Column Row : Table - SIS Timetable Column Row	*/
	timetable_column_row?: SISTimetableColumnRow[]
}