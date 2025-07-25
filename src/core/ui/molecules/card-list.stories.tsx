import type { Meta, StoryObj } from '@storybook/react'
import CardList from './card-list'
import PostListItem from './post-list-item'
import { Separator } from '@atoms/separator'
import Announcement from './announcement'
import { Tray } from 'phosphor-react'

const meta: Meta<typeof CardList> = {
  title: 'Molecules/Card list',
  component: CardList,
  decorators: (Story) => (
    <div className="w-[600px]">
      <Story />
    </div>
  ),
  argTypes: {
    title: { control: 'text', description: 'Title of article' },
    subtitle: { control: 'text', description: 'Description of article' },
  },
}

export default meta
type Story = StoryObj<typeof CardList>

export const SimpleList: Story = {
  args: {
    title: 'Top news',
    subtitle: 'Newsest news of whole the school',
    children: (
      <div className="flex flex-col">
        {Array.from(Array(5).keys()).map((item, index) => (
          <>
            {index !== 0 && <Separator />}
            <PostListItem
              url={'#'}
              title={'Lorem Picsum'}
              desc={
                'In a sudden and unexpected turn of events, a powerful earthquake rocked the coastal city of Seaville earlier today.'
              }
              timeAt={'2024/09/25 12:00'}
            />
          </>
        ))}
      </div>
    ),
  },
}

export const NewsList: Story = {
  args: {
    title: 'Top news',
    subtitle: 'Newsest news of whole the school',
    children: (
      <div className="flex flex-col gap-3">
        {Array.from(Array(3).keys()).map((item, index) => (
          <>
            {index !== 0 && <Separator />}
            <PostListItem
              url={'#'}
              thumbnail={'https://picsum.photos/300/200'}
              title={'Lorem Picsum'}
              desc={
                'In a sudden and unexpected turn of events, a powerful earthquake rocked the coastal city of Seaville earlier today.'
              }
              timeAt={'2024/09/25 12:00'}
            />
          </>
        ))}
      </div>
    ),
  },
}

export const EmptyList: Story = {
  args: {
    title: 'Top Feeds',
    subtitle: 'Newsest news of whole the school',
    children: (
      <Announcement
        className="!gap-1 py-10"
        icon={
          <Tray
            size={60}
            weight="fill"
            className="text-secondary opacity-20"
          />
        }
        title={<h4 className="font-semibold opacity-80">No feed!</h4>}
        subtitle={
          <p className="text-xs text-muted-foreground">
            You have no feed at this moment
          </p>
        }
      />
    ),
  },
}
