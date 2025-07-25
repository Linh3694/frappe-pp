import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@atoms/button'
import FeatureItem from './feature-item'
import { Heart } from 'phosphor-react'

const meta: Meta<typeof FeatureItem> = {
  title: 'Molecules/Feature items',
  component: FeatureItem,
  decorators: (Story) => (
    <div className="w-[400px]">
      <Story />
    </div>
  ),
  argTypes: {
    icon: { description: 'The icon of the item' },
    label: { description: 'Label item', control: 'text' },
    className: { description: 'Customize the item', control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof FeatureItem>

export const Default: Story = {
  args: {
    icon: <Heart size={32} className="text-brand-teal" />,
    label: 'Health care',
    className:
      'border-slate-200 border-2 p-2 rounded-md cursor-pointer hover:bg-brand-teal/10',
  },
}
