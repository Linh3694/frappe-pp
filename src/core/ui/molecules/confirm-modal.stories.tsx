import type { Meta, StoryObj } from '@storybook/react'
import ConfirmModal from './confirm-modal'
import { Button } from '@atoms/button'

const meta: Meta<typeof ConfirmModal> = {
  title: 'Molecules/Confirm modal',
  component: ConfirmModal,
  decorators: (Story) => (
    <div className="w-[600px]">
      <Story />
    </div>
  ),
  argTypes: {
    title: { control: 'text', description: 'Title of modal' },
    subtitle: { control: 'text', description: 'Description of modal' },
  },
}

export default meta
type Story = StoryObj<typeof ConfirmModal>

export const Default: Story = {
  args: {
    title: 'Delete file?',
    subtitle: 'Are you sure want to delete?',
    confirmButtonProps: { variant: 'destructive' },
    confirmButtonText: 'Delete',
    children: <Button>Delele File</Button>,
  },
}

export const Typing: Story = {
  args: {
    variant: 'typing',
    title: 'System shutdown',
    subtitle: 'Are you sure you want to shutdown system?',
    inputSetting: {
      inputLabel: 'Type SHUTDOWN to turn off the system',
      textConfirm: 'SHUTDOWN',
    },
    confirmButtonProps: { variant: 'destructive' },
    confirmButtonText: 'Turn off',
    children: <Button>Shutdown</Button>,
  },
}
