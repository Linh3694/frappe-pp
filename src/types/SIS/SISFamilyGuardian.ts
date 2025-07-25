
export interface SISFamilyGuardian{
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
	/**	Relationship with student : Data	*/
	relationship_with_student?: string
	/**	Notes : Small Text	*/
	notes?: string
	/**	Child Data Access : Check	*/
	child_data_access?: 0 | 1
}