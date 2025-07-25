import { SISFamilyChild } from './SISFamilyChild'
import { SISFamilyGuardian } from './SISFamilyGuardian'

export interface SISFamily{
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
	/**	Family Key : Data	*/
	family_key: string
	/**	Home Address : Data	*/
	home_address: string
	/**	Status : Select	*/
	status: "Married" | "Separated" | "Divorced" | "De Facto" | "Other" | "Single"
	/**	Children : Table - SIS Family Child	*/
	children?: SISFamilyChild[]
	/**	Guardians : Table - SIS Family Guardian	*/
	guardians?: SISFamilyGuardian[]
}