import React, { ReactElement } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IconProps } from 'phosphor-react'
import {
  ForwardRefExoticComponent,
  HTMLAttributes,
  ReactNode,
  type FC,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/core/utils/shadcn-utils'

type Props = {
  className?: string
  active?: (item: ItemOptionsType) => boolean
  activeClassName?: ActiveClassNameType
  items: ItemOptionsType[]
  itemDirection?: 'horizontal' | 'vertical'
  mode?: 'horizontal' | 'vertical'
}

type NavItemProps = {
  label?: string | ReactNode
  className?: string
  active?: boolean
  activeClassName?: ActiveClassNameType
  path?: string
  icon?: ReactElement
  badge?: ReactNode
  vertical?: boolean
  disabled?: boolean
}

type ActiveClassNameType = {
  text?: string
  background?: string
}

export type ItemOptionsType = {
  key: string
  label: string
  path?: string
  icon?: ReactElement
  type?: 'group' | 'divider'
  disabled?: boolean
  children?: ItemOptionsType[]
}

export default function NavMenu({
  className,
  active = () => false,
  activeClassName,
  items,
  itemDirection = 'horizontal',
  mode = 'vertical',
}: Props) {
  return (
    <div
      className={cn(
        'flex gap-2',
        {
          'flex-col': mode === 'vertical',
          'flex-row': mode === 'horizontal',
        },
        className,
      )}
    >
      {items?.map((_) => {
        if (_.children) {
          return (
            <React.Fragment key={_.key}>
              {mode === 'vertical' && (
                <h4 className="text-md my-2 text-brand-teal">{_.label}</h4>
              )}
              {_.children.map((child) => (
                <NavItem
                  key={child.key}
                  label={child.label}
                  path={child.path}
                  icon={child.icon}
                  disabled={child.disabled}
                  active={active(child)}
                  activeClassName={activeClassName}
                  vertical={itemDirection === 'vertical'}
                />
              ))}
            </React.Fragment>
          )
        }
        return (
          <NavItem
            key={_.key}
            label={_.label}
            path={_.path}
            icon={_.icon}
            disabled={_.disabled}
            active={active(_)}
            activeClassName={activeClassName}
            vertical={itemDirection === 'vertical'}
          />
        )
      })}
    </div>
  )
}

const NavItem = ({
  label,
  className,
  path,
  active,
  activeClassName,
  icon,
  badge,
  vertical,
  disabled = false
}: NavItemProps) => {
  const navigate = useNavigate()

  const handleClickItem = (path?: string) => {
    path && navigate(path)
  }

  return (
    <div
      className={cn(
        'cursor-pointer rounded-md p-2',
        active && (activeClassName?.background || 'bg-slate-300'),
        {
          'flex items-center gap-3': !vertical,
          'flex flex-col items-center': vertical,
          'opacity-50 hover:bg-transparent':disabled
          // 'bg-brand-teal/10': active && vertical,
        },
        className,
      )}
      onClick={() => !disabled && handleClickItem(path)}
    >
      <div className={'relative'}>
        {icon &&
          React.cloneElement(icon, {
            className: cn(
              icon.props.className,
              active && activeClassName?.text,
            ),
          })}
        {badge}
      </div>
      <div
        className={cn('text-foreground line-clamp-1 md:text-lg text-sm', active && activeClassName?.text)}
      >
        {label}
      </div>
    </div>
  )
}
