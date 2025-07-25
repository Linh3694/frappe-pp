import type { Meta, StoryObj } from '@storybook/react'
import { Download, User, UserCircle } from 'phosphor-react'
import NotificationListItem from './notification-list-item'

const meta: Meta<typeof NotificationListItem> = {
  title: 'Molecules/Notification list item',
  component: NotificationListItem,
  decorators: (Story) => (
    <div className="w-[500px]">
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
type Story = StoryObj<typeof NotificationListItem>

export const Default: Story = {
  args: {
    title: 'Leave request approved',
    desc: 'Leave request approved by Mr.John',
    date: '2024-03-24 12:20',
    unread: false,
  },
}
