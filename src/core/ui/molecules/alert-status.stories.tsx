import type { Meta, StoryObj } from '@storybook/react'
import AlertStatus from './alert-status'

const meta: Meta<typeof AlertStatus> = {
  title: 'Molecules/Alert status',
  component: AlertStatus,
  decorators: (Story) => (
    <div className="w-[300px]">
      <Story />
    </div>
  ),
  argTypes: {
    message: { control: 'text', description: "Content of Alert" },
    desc: { control: 'text', description: "Additional content of Alert" },
    type: { description: "Type of Alert styles, options: success, info, warning, error" },
  }
}

export default meta
type Story = StoryObj<typeof AlertStatus>

export const Success: Story = {
  args: {
    message: 'Success',
    desc: 'You are successfully!',
    type: 'success',
  },
}

export const Error = {
  args: {
    message: 'Error',
    desc: 'Oops! Something is wrong!',
    type: 'error',
  },
}

export const Info = {
  args: {
    message: 'Infomation!',
    desc: 'There is a messege here',
    type: 'info',
  },
}

export const Warning = {
  args: {
    message: 'Warning!',
    desc: 'There is a messege here',
    type: 'warning',
  },
}
