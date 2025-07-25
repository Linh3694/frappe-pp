
export interface SISSchoolYear{
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
	/**	Status : Select	*/
	status: "Past" | "Current" | "Upcoming"
	/**	First day : Date	*/
	first_day: string
	/**	Last day : Date	*/
	last_day: string
	/**	Sequence Number : Int	*/
	sequence_number?: number
}