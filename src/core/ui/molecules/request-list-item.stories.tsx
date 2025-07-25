import type { Meta, StoryObj } from '@storybook/react'
import RequestListItem from './request-list-item'

const meta: Meta<typeof RequestListItem> = {
  title: 'Molecules/Request list item',
  component: RequestListItem,
  decorators: (Story) => (
    <div className="w-[700px]">
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
type Story = StoryObj<typeof RequestListItem>

export const Approved: Story = {
  args: {
    title: 'Morning 24/04/2024 - Afternoon 24/04/2024',
    subtitle: 'Reason: Travel',
    status: 'Approved'
  },
}


export const Pending: Story = {
  args: {
    title: 'Morning 24/04/2024 - Afternoon 24/04/2024',
    subtitle: 'Reason: Travel',
    status: 'Pending'
  },
}


export const Cancelled: Story = {
  args: {
    title: 'Morning 24/04/2024 - Afternoon 24/04/2024',
    subtitle: 'Reason: Travel',
    status: 'Cancelled'
  },
}