import type { Meta, StoryObj } from '@storybook/react'
import { Tray } from 'phosphor-react'
import UserProfileCard from './user-profile-card'
import { Button } from '@atoms/button'

const meta: Meta<typeof UserProfileCard> = {
  title: 'Molecules/Profile Card',
  component: UserProfileCard,
  decorators: (Story) => (
    <div className="w-[400px]">
      <Story />
    </div>
  ),
  argTypes: {
    avatar: { control: 'text' },
    name: { control: 'text' },
    subInfo: { control: 'text' },
    metaData: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof UserProfileCard>

export const Small: Story = {
  args: {
    avatar: `https://i.pravatar.cc/300`,
    name: 'Nguyễn Minh Anh',
    subInfo: `Class 07.04`,
    className: 'w-[200px]',
    variant: 'small',
  },
}

export const Large: Story = {
  args: {
    avatar: `https://i.pravatar.cc/300`,
    name: 'Nguyễn Minh Anh',
    subInfo: `Class 07.04`,
    metaData: `minh.anh@wellspring.edu.vn`,
    actions: (
      <Button
        size="sm"
        variant="outline"
        className="border-slate-600 bg-transparent"
      >
        Switch
      </Button>
    ),
    variant: 'large',
  },
}
