import { HTMLAttributes, type FC } from 'react'
import { cn } from '@/core/utils/shadcn-utils'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@atoms/select'
import { Theme, useTheme } from '@/lib/shadcn/theme-provider'
import { Switch } from '@atoms/switch'

export type ThemeSwitcherProps = HTMLAttributes<HTMLDivElement> & {}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
  const { theme, setTheme } = useTheme()

  const handleChangeTheme = (theme: Theme) => {
    console.log(theme)
    setTheme(theme)
  }
  return (
    <div className={cn(className)}>
      <Switch checked={theme  === "dark"} onCheckedChange={(checked)=>handleChangeTheme(checked ? "dark" : "light")} />
    </div>
  )
}
