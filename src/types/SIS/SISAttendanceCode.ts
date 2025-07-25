
export interface SISAttendanceCode{
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
	/**	Short Title : Data	*/
	short_title: string
	/**	Type : Select	*/
	type: "Core" | "Additional"
	/**	Direction : Select	*/
	type_copy: "In" | "Out"
	/**	Scope : Select	*/
	scope: "Onsite" | "Onsite-Late" | "Offsite" | "Offsite-Left" | "Offsite-Late"
	/**	Active : Check	*/
	active?: 0 | 1
	/**	Reportable : Check	*/
	reportable?: 0 | 1
	/**	Future : Check	*/
	future?: 0 | 1
	/**	Prefill : Check	*/
	prefill?: 0 | 1
	/**	Role ID All : Data	*/
	role_id_all: string
	/**	Sequence number : Int	*/
	sequence_number?: number
}