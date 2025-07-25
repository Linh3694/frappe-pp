
export interface SISSchoolFeed{
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
	/**	School Year : Link - SIS School Year	*/
	school_year: string
	/**	Title : Data	*/
	title: string
	/**	Description : Small Text	*/
	description?: string
	/**	Content : Text Editor	*/
	content?: string
	/**	Thumbnail : Attach Image	*/
	thumbnail: string
	/**	Status : Select	*/
	status: "Draft" | "Waiting Approval" | "Public"
	/**	Public time : Datetime	*/
	public_time?: string
	/**	Grade Levels : Data	*/
	grade_levels: string
	/**	To All Schools : Check	*/
	to_all_schools?: 0 | 1
	/**	To Primary School : Check	*/
	to_primary_school?: 0 | 1
	/**	To Middle School : Check	*/
	to_middle_school?: 0 | 1
	/**	To High School : Check	*/
	to_high_school?: 0 | 1
	/**	Display PDF : Attach	*/
	display_pdf?: string
	/**	Display Image : Attach Image	*/
	display_image?: string
}