import type { Meta, StoryObj } from '@storybook/react'
import ToggleLikeButton from './toggle-like-button'

const meta: Meta<typeof ToggleLikeButton> = {
  title: 'Molecules/Toggle like',
  component: ToggleLikeButton,
  decorators: (Story) => (
    <div className="w-[400px]">
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
type Story = StoryObj<typeof ToggleLikeButton>

export const Default: Story = {
  args: {
    active: false,
	count: 212
  },
}
