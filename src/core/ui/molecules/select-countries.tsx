import { HTMLAttributes, type FC } from 'react'
import { cn } from '@/core/utils/shadcn-utils'
import { Combobox, ComboboxProps } from '@atoms/combobox'
import { useGetProvinces } from '@/api/provincesVN/use-get-provinces'
import { useGetProvince } from '@/api/provincesVN/use-get-province'
import { useGetDistrict } from '@/api/provincesVN/use-get-district'
import { useGetCountries } from '@/api/countries/useGetCountries'

export type SelectContriesProps = ComboboxProps & {}

export const SelectContries: FC<SelectContriesProps> = ({ ...props }) => {
  const { countries } = useGetCountries()

  return (
    <Combobox
      items={countries?.map((c) => ({
        label: c.name,
        value: c.name,
      }))}
      emptyContent="No result!"
      {...props}
    />
  )
}
