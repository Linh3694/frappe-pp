
export interface SISFamilyChild{
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
	/**	Person : Link - SIS Person	*/
	person: string
	/**	Notes : Small Text	*/
	notes?: string
}