import type { Meta, StoryObj } from '@storybook/react'
import { Download } from 'phosphor-react'
import FileListItem from './file-list-item'

const meta: Meta<typeof FileListItem> = {
  title: 'Molecules/File item',
  component: FileListItem,
  decorators: (Story) => (
    <div className="w-[500px]">
      <Story />
    </div>
  ),
  argTypes: {
    title: { description: 'Title of the item', control: 'text' },
    subtitle: { description: 'Subtitle of the item', control: 'text' },
    action: { description: 'Action element of the item' },
  },
}

export default meta
type Story = StoryObj<typeof FileListItem>

export const Default: Story = {
  args: {
    title: 'Annual Health Check',
    subtitle: 'Annual health check for the 2023-2024 school year.',
    action: <Download size={30} className="text-brand-orange" weight="bold" />,
  },
}
