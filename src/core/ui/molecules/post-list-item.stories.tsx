import type { Meta, StoryObj } from '@storybook/react'
import PostListItem from './post-list-item'

const meta: Meta<typeof PostListItem> = {
  title: 'Molecules/Post list item',
  component: PostListItem,
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
type Story = StoryObj<typeof PostListItem>

export const Default: Story = {
  args: {
    url: '#',
    thumbnail: 'https://picsum.photos/300/200',
    title: 'Lorem Picsum',
    desc: 'In a sudden and unexpected turn of events, a powerful earthquake rocked the coastal city of Seaville earlier today.',
    timeAt: '2024/09/25 12:00',
  },
}

export const WithoutImage: Story = {
  args: {
    url: '#',
    title: 'Lorem Picsum',
    desc: 'In a sudden and unexpected turn of events, a powerful earthquake rocked the coastal city of Seaville earlier today.',
    timeAt: '2024/09/25 12:00',
  },
}

export const GridMode: Story = {
  args: {
    url: '#',
    thumbnail: 'https://picsum.photos/300/200',
    title: 'Lorem Picsum',
    desc: 'In a sudden and unexpected turn of events, a powerful earthquake rocked the coastal city of Seaville earlier today.',
    timeAt: '2024/09/25 12:00',
    variant: 'grid'
  },
}