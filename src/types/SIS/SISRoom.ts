
export interface SISRoom{
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
	/**	Bulding : Link - SIS Floor	*/
	bulding: string
	/**	Floor : Link - SIS Floor	*/
	floor: string
	/**	Title : Data	*/
	title: string
	/**	Short Title : Data	*/
	short_title: string
	/**	Code : Data	*/
	code: string
	/**	Capacity : Int	*/
	capacity: number
	/**	Type : Select	*/
	type: "Classroom" | "Hall" | "Library" | "Stadium"
	/**	Active : Check	*/
	active?: 0 | 1
	/**	Comment : Small Text	*/
	comment?: string
}