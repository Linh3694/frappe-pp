import type { Meta, StoryObj } from '@storybook/react'
import { Download, User, UserCircle } from 'phosphor-react'
import MonitorBox from './monitor-box'

const meta: Meta<typeof MonitorBox> = {
  title: 'Molecules/Monitor Box',
  component: MonitorBox,
  decorators: (Story) => (
    <div className="w-[200px]">
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
type Story = StoryObj<typeof MonitorBox>

export const Horizontal: Story = {
  args: {
    icon: <User size={18} className="text-brand-teal" weight="bold" />,
    label: 'Online',
    children: (
      <div className="flex items-center gap-3">
        <p className="text-4xl text-green-500">525</p>
      </div>
    ),
  },
}

export const Vertical: Story = {
  args: {
    icon: <UserCircle size={50} className="text-brand-teal" weight="regular" />,
    label: 'Online',
    variant: 'vertical',
    children: (
      <div className="flex items-center gap-3">
        <p className="text-4xl text-green-500">525</p>
      </div>
    ),
  },
}
