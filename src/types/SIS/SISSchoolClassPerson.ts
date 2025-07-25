
export interface SISSchoolClassPerson{
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
	/**	Full Name : Data	*/
	full_name?: string
	/**	Role : Select	*/
	role: "Student" | "Homeroom Teacher" | "Nanny" | "TA" | "Parent"
}