
export interface SISSettings{
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
	/**	Founding Year : Int	*/
	founding_year: number
	/**	Current School Year : Link - SIS School Year	*/
	current_school_year: string
}