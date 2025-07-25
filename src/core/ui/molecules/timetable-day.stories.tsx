import type { Meta, StoryObj } from '@storybook/react'
import TimetableDay from './timetable-day'

const meta: Meta<typeof TimetableDay> = {
  title: 'Molecules/Timetable day',
  component: TimetableDay,
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
type Story = StoryObj<typeof TimetableDay>

export const Default: Story = {
  args: {
    title: 'Math',
    subtitle: 'Mr.John',
    start: Date.parse('2024-04-15 8:00'),
    end: Date.parse('2024-04-15 8:01'),
  },
}
