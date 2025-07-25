
export interface SISFloor{
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
	/**	Building : Link - SIS Building	*/
	building: string
	/**	Title : Data	*/
	title: string
	/**	Short Title : Data	*/
	short_title: string
}