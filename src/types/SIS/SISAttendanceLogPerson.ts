
export interface SISAttendanceLogPerson{
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
	/**	Person : Link - SIS Person	*/
	person: string
	/**	Full Name : Data	*/
	full_name?: string
	/**	Attendance Code : Select	*/
	attendance_code: "Present" | "Late" | "Authorized Absent" | "Unauthorized Absent"
	/**	Reason : Data	*/
	reason?: string
}