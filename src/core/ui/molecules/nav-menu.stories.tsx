import type { Meta, StoryObj } from '@storybook/react'
import {
  Bell,
  Calendar,
  Download,
  Gear,
  NotePencil,
  User,
  UserCircle,
} from 'phosphor-react'
import NavMenu, { ItemOptionsType } from './nav-menu'

const meta: Meta<typeof NavMenu> = {
  title: 'Molecules/Nav Menu',
  component: NavMenu,
  decorators: (Story) => (
    <div className="">
      <Story />
    </div>
  ),
  // argTypes: {
  //   title: { description: 'Title of the item', control: 'text' },
  //   subtitle: { description: 'Subtitle of the item', control: 'text' },
  //   action: { description: 'Action element of the item' },
  // },
}

export default meta
type Story = StoryObj<typeof NavMenu>

const Items: ItemOptionsType[] = [
  {
    key: 'item-1',
    label: 'Item 1',
    path: '/item-1',
    icon: (
      <Bell size={25} weight={'regular'} className="text-brand-secondary" />
    ),
  },
  {
    key: 'sm',
    label: 'Group 2',
    type: 'group',
    children: [
      {
        key: 'item-2-1',
        label: 'Item 2-1',
        path: '/group-2/1',
        icon: (
          <Calendar
            size={25}
            weight={'regular'}
            className="text-brand-secondary"
          />
        ),
      },
      {
        key: 'item-2-2',
        label: 'Item 2-2',
        path: '/group-2/2',
        icon: (
          <NotePencil
            size={25}
            weight={'regular'}
            className="text-brand-secondary"
          />
        ),
      },
    ],
  },
  {
    key: 'item-3',
    label: 'Item 3',
    path: '/item-3',
    icon: (
      <Gear size={25} weight={'regular'} className="text-brand-secondary" />
    ),
  },
]


export const MenuVertical1: Story = {
  args: {
    items: Items,
    active: (item) => item.key === 'item-1',
    itemDirection: "horizontal",
    mode: 'vertical',
    className: "w-[300px]"
  },
}


export const MenuVertical2: Story = {
  args: {
    items: Items,
    active: (item) => item.key === 'item-1',
    itemDirection: "vertical",
    mode: 'vertical',
    className: "w-[100px]"
  },
}

export const MenuHorizontal1: Story = {
  args: {
    items: Items,
    active: (item) => item.key === 'item-1',
    itemDirection: "horizontal",
    mode: 'horizontal',
  },
}

export const MenuHorizontal2: Story = {
  args: {
    items: Items,
    active: (item) => item.key === 'item-1',
    itemDirection: "vertical",
    mode: 'horizontal',
  },
}