import { LevelsConfigType } from "@molecules/password-level"

export const APP = {
  NAME: 'Wellspring Parent Portal',
  HELMET_TEMPLATE: '%s | Wellspring Parent Portal',
  MD_BREAKPOINT: 768,
} as const

export const PasswordLevelsConfig: LevelsConfigType[] = [
  {
    label: 'Weak',
    color: '#CB4335',
  },
  {
    label: 'Avarage',
    color: '#F1C40F',
  },
  {
    label: 'Strong',
    color: '#3498DB',
  },
  {
    label: 'Exellent',
    color: '#52BE80',
  },
]

