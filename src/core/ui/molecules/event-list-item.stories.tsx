import type { Meta, StoryObj } from '@storybook/react'
import EventListItem from './event-list-item'

const meta: Meta<typeof EventListItem> = {
  title: 'Molecules/Event list item',
  component: EventListItem,
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
type Story = StoryObj<typeof EventListItem>

export const Default: Story = {
  args: {
    title: 'Lorem Picsum',
    desc: 'In a sudden and unexpected turn of events, a powerful earthquake rocked the coastal city of Seaville earlier today.',
    date: '2024/09/25 12:00',
  },
}