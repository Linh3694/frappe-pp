
export interface PPVariableSetting{
	name: string
	creation: string
	modified: string
	owner: string
	modified_by: string
	docstatus: 0 | 1 | 2
	parent?: string
	parentfield?: string
	parenttype?: string
	idx?: number
	/**	Guardian Registration Exclude (;) : Small Text	*/
	guar_regis_exclude?: string
}