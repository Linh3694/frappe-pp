
export interface PPChannel{
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
	/**	Type : Select	*/
	type: "Private" | "Public" | "Open"
	/**	Channel Name : Data	*/
	channel_name: string
	/**	Channel Description : Data	*/
	channel_description?: string
	/**	Is Direct Message : Check	*/
	is_direct_message?: 0 | 1
	/**	Is Self Message : Check	*/
	is_self_message?: 0 | 1
	/**	Is Archived : Check	*/
	is_archived?: 0 | 1
}