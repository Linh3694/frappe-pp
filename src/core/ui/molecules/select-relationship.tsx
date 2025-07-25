import { HTMLAttributes, type FC } from 'react'
import { cn } from '@/core/utils/shadcn-utils'
import { Combobox, ComboboxProps } from '@atoms/combobox'
import { useGetProvinces } from '@/api/provincesVN/use-get-provinces'
import { useGetProvince } from '@/api/provincesVN/use-get-province'
import { useGetDistrict } from '@/api/provincesVN/use-get-district'
import { useGetCountries } from '@/api/countries/useGetCountries'
import { useGetRelationship } from '@/api/relationship/useGetRelationship'

export type SelectRelationshipProps = ComboboxProps & {
  defaultFirstValue?: boolean
}

export const SelectRelationship: FC<SelectRelationshipProps> = ({
  defaultFirstValue = false,
  ...props
}) => {
  const { relationship } = useGetRelationship()

  return (
    <Combobox
      key={JSON.stringify(relationship)}
      defaultValue={defaultFirstValue ? relationship?.[0].value : undefined}
      items={relationship}
      emptyContent="No result!"
      {...props}
    />
  )
}
