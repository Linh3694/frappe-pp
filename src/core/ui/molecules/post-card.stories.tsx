import type { Meta, StoryObj } from '@storybook/react'
import PostCard from './post-card'

const meta: Meta<typeof PostCard> = {
  title: 'Molecules/Post Card',
  component: PostCard,
  decorators: (Story) => (
    <div className="w-[350px]">
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
type Story = StoryObj<typeof PostCard>

export const Default: Story = {
  args: {
    url: '#',
    thumbnail: 'https://picsum.photos/300/200',
    title: 'Lorem Picsum',
    desc: 'In a sudden and unexpected turn of events, a powerful earthquake rocked the coastal city of Seaville earlier today.',
    timeAt: '2024/09/25 12:00',
  },
}
