import type { Meta, StoryObj } from '@storybook/react'
import PegBoard from './pegboard'
import FeatureItem from './feature-item'
import { Gear } from 'phosphor-react'

const meta: Meta<typeof PegBoard> = {
  title: 'Molecules/Pegboard',
  component: PegBoard,
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
type Story = StoryObj<typeof PegBoard>

export const Default: Story = {
  args: {
    label: 'Services',
    cols: 3,
    children: (
      <>
        {Array.from(Array(6).keys()).map(() => (
          <FeatureItem
            icon={<Gear size={30} className="text-brand-secondary" />}
            label="Item"
          />
        ))}
      </>
    ),
  },
}
