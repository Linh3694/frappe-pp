
export interface SISClassFeed{
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
	/**	Class Type : Select	*/
	class_type: "School Class" | "Course Class"
	/**	School Class : Link - SIS School Class	*/
	school_class?: string
	/**	School Year : Data	*/
	school_year?: string
	/**	Course Class : Link - SIS Course Class	*/
	course_class?: string
	/**	Title : Data	*/
	title: string
	/**	Description : Small Text	*/
	description?: string
	/**	Content : Text Editor	*/
	content?: string
	/**	Status : Select	*/
	status: "Draft" | "Waiting Approval" | "Public"
	/**	Public Time : Datetime	*/
	public_time?: string
}