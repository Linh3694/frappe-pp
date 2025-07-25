
export interface SISGuardianRegistration{
	name: string
	creation: string
	modified: string
	owner: string
	modified_by: string
	docstatus: 0 | 1 | 2
	parent?: string
	parentfield?: string
	parenttype?: string
	idx?: number
	/**	First Name : Data	*/
	first_name: string
	/**	Last Name : Data	*/
	last_name: string
	/**	Date Of Birth : Date	*/
	date_of_birth?: string
	/**	Gender : Select	*/
	gender?: "Male" | "Female"
	/**	Emaill : Data	*/
	email?: string
	/**	Phone Number : Data	*/
	phone_number?: string
	/**	Nationality : Data	*/
	nationality?: string
	/**	Status : Select	*/
	status?: "New" | "Processed" | "Deny"
	/**	Address : Data	*/
	address?: string
	/**	Province : Data	*/
	province?: string
	/**	District : Data	*/
	district?: string
	/**	Ward : Data	*/
	ward?: string
	/**	Company : Data	*/
	company?: string
	/**	Job Title : Data	*/
	job_title?: string
	/**	Relationship with student : Data	*/
	relationship_with_student?: string
	/**	Family : Link - SIS Family	*/
	family?: string
	/**	Confirm Date : Date	*/
	confirm_date?: string
	/**	Result : Data	*/
	result?: string
	/**	Note : Small Text	*/
	note?: string
}