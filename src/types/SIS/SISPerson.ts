
export interface SISPerson{
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
	/**	Avatar : Attach Image	*/
	avatar?: string
	/**	First Name : Data	*/
	first_name: string
	/**	Middle Name : Data	*/
	middle_name?: string
	/**	Last Name : Data	*/
	last_name: string
	/**	Full Name : Data	*/
	full_name?: string
	/**	English Name : Data	*/
	english_name?: string
	/**	Common Name : Data	*/
	common_name?: string
	/**	Email : Data	*/
	email?: string
	/**	Phone Number : Data	*/
	phone_number?: string
	/**	Date of Birth : Date	*/
	date_of_birth?: string
	/**	Gender : Select	*/
	gender: "Male" | "Female"
	/**	Nationality : Data	*/
	nationality?: string
	/**	Primary Role : Select	*/
	primary_role: "Student" | "Guardian" | "Teacher" | "TA" | "Nanny" | "Staff"
	/**	Company : Data	*/
	company?: string
	/**	Job Title : Data	*/
	job_title?: string
	/**	Address : Data	*/
	address?: string
	/**	Province : Data	*/
	province?: string
	/**	District : Data	*/
	district?: string
	/**	Ward : Data	*/
	ward?: string
}