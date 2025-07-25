
export interface SISBuilding{
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
	/**	Country : Data	*/
	country: string
	/**	Province : Data	*/
	province: string
	/**	District : Data	*/
	district: string
	/**	Ward : Data	*/
	ward: string
	/**	Description : Small Text	*/
	description?: string
}