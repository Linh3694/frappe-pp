import { HTMLAttributes, type FC } from 'react'
import { cn } from '@/core/utils/shadcn-utils'
import { Combobox, ComboboxProps } from '@atoms/combobox'
import { useGetProvinces } from '@/api/provincesVN/use-get-provinces'
import { useGetProvince } from '@/api/provincesVN/use-get-province'
import { useGetDistrict } from '@/api/provincesVN/use-get-district'

export type SelectProvincesProps = ComboboxProps & {

}

export const SelectProvinces: FC<SelectProvincesProps> = ({ ...props }) => {
  const { provinces } = useGetProvinces()

  return (
    <Combobox
      items={provinces?.map((p) => ({
        label: p.name,
        value: JSON.stringify({ name: p.name, code: p.code }),
      }))}
      emptyContent="No result!"
      {...props}
    />
  )
}

export type SelectDistrictsProps = ComboboxProps & {
  province?: string
}

export const SelectDistricts: FC<SelectDistrictsProps> = ({
  province,
  ...props
}) => {
  const { province: provinceData } = useGetProvince(province, !province)

  return (
    <Combobox
      items={provinceData?.districts.map((p) => ({
        label: p.name,
        value: JSON.stringify({ name: p.name, code: p.code }),
      }))}
      emptyContent="No result!"
      {...props}
    />
  )
}

export type SelectWardsProps = ComboboxProps & {
  district?: string
}

export const SelectWards: FC<SelectWardsProps> = ({ district, ...props }) => {
  const { district: districtData } = useGetDistrict(district, !district)
  return (
    <Combobox
      items={districtData?.wards?.map((p) => ({
        label: p.name,
        value: JSON.stringify({ name: p.name, code: p.code }),
      }))}
      emptyContent="No result!"
      {...props}
    />
  )
}
