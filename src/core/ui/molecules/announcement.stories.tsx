import type { Meta, StoryObj } from '@storybook/react'
import Announcement from './announcement'
import { Plugs, Prohibit, Tray } from 'phosphor-react'
import { Button } from '@atoms/button'

const meta: Meta<typeof Announcement> = {
  title: 'Molecules/Announcement',
  component: Announcement,
  argTypes: {
    icon: { description: 'Content of Alert' },
    title: { control: 'text', description: 'Title of announcement' },
    subtitle: { control: 'text', description: 'Description of announcement' },
    action: { description: 'Element add-on' },
  },
}

export default meta
type Story = StoryObj<typeof Announcement>

export const Fobbiden: Story = {
  args: {
    icon: (
      <Prohibit
        size={120}
        weight="fill"
        className="text-brand-secondary opacity-50"
      />
    ),
    title: <h4 className="text-4xl font-semibold">Fobbiden</h4>,
    subtitle: (
      <p className="text-sm text-muted-foreground">
        We are sorry, but you don't have access to this page.
      </p>
    ),
    action: <Button>Go back</Button>,
  },
}

export const InternetServerError: Story = {
  args: {
    icon: (
      <Plugs
        size={120}
        weight="fill"
        className="text-brand-secondary opacity-50"
      />
    ),
    title: <h4 className="text-4xl font-semibold">Internet Server Error</h4>,
    subtitle: (
      <p className="text-sm text-muted-foreground">
        We are working on fixing the problem. Please try again.
      </p>
    ),
    action: <Button>Go back</Button>,
  },
}

export const NotFound: Story = {
  args: {
    className:"!gap-1",
    icon: (
      <Tray
        size={60}
        weight="fill"
        className="text-brand-secondary opacity-20"
      />
    ),
    title: <h4 className="font-semibold opacity-80">No feed!</h4>,
    subtitle: (
      <p className="text-xs text-muted-foreground">
        You have no feed at this moment
      </p>
    ),
  },
}
