
export interface SISCourse{
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
	/**	Description : Small Text	*/
	description?: string
	/**	Program Type : Select	*/
	program_type: "VP" | "IP" | "SSC" | "Other"
}