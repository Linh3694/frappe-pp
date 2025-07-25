import type { Meta, StoryObj } from '@storybook/react'
import { Download, User, UserCircle } from 'phosphor-react'
import PasswordLevel from './password-level'
import { PasswordLevelsConfig } from '@/config/app'

const meta: Meta<typeof PasswordLevel> = {
  title: 'Molecules/Password Level',
  component: PasswordLevel,
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
type Story = StoryObj<typeof PasswordLevel>

export const Default: Story = {
  args: {
    value: 1,
    config: PasswordLevelsConfig
  },
}
