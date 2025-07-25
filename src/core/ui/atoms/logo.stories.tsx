import type { Meta, StoryObj } from '@storybook/react'
import Logo from './logo'

const meta: Meta<typeof Logo> = {
  title: 'Atoms/Logo',
  component: Logo,
  render: (args): any => {
    if (args.variant == 'default') {
      return (
        <div className="w-[300px] px-5">
          <Logo {...args} />
        </div>
      )
    }
    if (args.variant == 'white') {
      return (
        <div className="w-[300px] bg-brand-primary px-5">
          <Logo {...args} />
        </div>
      )
    }
  },
  argTypes: {
    variant: { description: 'Variant of Logo styles, options: default, white' },
  },
}

export default meta
type Story = StoryObj<typeof Logo>

export const Colorful: Story = {
  args: {
    variant: 'default',
  },
}

export const White = {
  args: {
    variant: 'white',
  },
}
