
export interface PPMessage{
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
	/**	Channel : Link - PP Channel	*/
	channel_id: string
	/**	Content : Long Text	*/
	content?: string
	/**	Text : Long Text	*/
	text?: string
	/**	Is Edited : Check	*/
	is_edited?: 0 | 1
	/**	Message Type : Select	*/
	message_type?: "Text" | "Image" | "File"
}