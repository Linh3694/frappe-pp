
export interface SISStaff{
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
	/**	Employee Code : Data	*/
	employee_code: string
	/**	Full Name : Data	*/
	full_name?: string
	/**	Department : Data	*/
	department?: string
	/**	Avatar : Attach Image	*/
	avatar?: string
}