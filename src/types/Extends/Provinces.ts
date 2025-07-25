type LocationType = {
  code: string
  codename: string
  division_type: string
  name: string
  province_code: string
}
export type ProvinceType = LocationType & {
  districts: DistrictType[]
}
export type DistrictType = LocationType & {
  wards: LocationType[]
}
