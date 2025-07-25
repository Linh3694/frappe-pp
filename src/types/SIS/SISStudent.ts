
export interface SISStudent{
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
	full_name: string
	/**	Wellspring Student Code : Data	*/
	wellspring_student_code: string
	/**	Moet Student Code : Data	*/
	moet_student_code?: string
	/**	Status : Select	*/
	status: "Enabled" | "Disabled"
	/**	Current School Class : Data	*/
	current_school_class?: string
	/**	Avatar : Attach Image	*/
	avatar?: string
}