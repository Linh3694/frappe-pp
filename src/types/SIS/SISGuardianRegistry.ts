
export interface SISGuardianRegistry{
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
	/**	Full Name : Data	*/
	full_name: string
	/**	Common Name : Data	*/
	common_name?: string
	/**	Date of birth : Date	*/
	date_of_birth?: string
	/**	Gender : Select	*/
	gender: "Male" | "Female"
	/**	Nationality : Data	*/
	nationality?: string
	/**	Email : Data	*/
	email: string
	/**	Phone number : Data	*/
	phone_number?: string
	/**	Person : Link - SIS Person	*/
	person?: string
	/**	Status : Select	*/
	status: "New" | "Accepted" | "Deny"
	/**	Address : Data	*/
	address?: string
	/**	Ward : Data	*/
	ward?: string
	/**	District : Data	*/
	district?: string
	/**	Province : Data	*/
	province?: string
	/**	Company : Data	*/
	company?: string
	/**	Job Title : Data	*/
	job_title?: string
	/**	Family : Link - SIS Family	*/
	family?: string
	/**	Relationship with student : Data	*/
	relationship_with_student: string
	/**	Processed By : Data	*/
	processed_by?: string
	/**	Processed Date : Datetime	*/
	processed_date?: string
	/**	Note : Small Text	*/
	note?: string
	/**	Amended From : Link - SIS Guardian Registry	*/
	amended_from?: string
	/**	Reason : Small Text	*/
	reason?: string
}