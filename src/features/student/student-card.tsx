import { Button } from '@atoms/button'
import { cn } from '@/core/utils/shadcn-utils'
import { Avatar, AvatarFallback, AvatarImage } from '@atoms/avatar'
import {
  ArrowRight,
  ArrowsCounterClockwise,
  ClipboardText,
  IconProps,
  User,
} from 'phosphor-react'
import {
  ForwardRefExoticComponent,
  HTMLAttributes,
  ReactNode,
  useContext,
  type FC,
} from 'react'
import { StudentsSwitcherModal } from './student-switcher-modal'
import UserProfileCard, {
  ProfileCardLarge,
  ProfileCardSmall,
} from '@molecules/user-profile-card'
import { spawn } from 'child_process'
import { useLocales } from '@/core/hooks'
import { ChildrenContext, useChildren } from '@/lib/student/children-provider'
import { StudentDetailModal } from './student-detail-modal'
import { useTheme } from '@/lib/shadcn/theme-provider'

export type StudentInfoProps = HTMLAttributes<HTMLDivElement> & {
  size?: 'small' | 'large'
}

export const StudentCard: FC<StudentInfoProps> = ({
  className,
  size = 'small',
}) => {
  const { t } = useLocales()
  const { theme } = useTheme()
  const { current } = useChildren()

  // console.log('children',current)

  if (size === 'small')
    return (
      <StudentsSwitcherModal disabled={!current}>
        <button>
          <ProfileCardSmall
            className="bg-brand-teal/30 hover:bg-brand-teal/20"
            avatar={current?.avatar}
            avatarAlt={current?.full_name}
            name={
              <span className="text-brand-teal">
                {current?.full_name || 'No children'}
              </span>
            }
            subInfo={
              <span className="text-muted-foreground">
                {current &&
                  `${t('class')} ${current?.school_class_short_title}`}
              </span>
            }
          />
        </button>
      </StudentsSwitcherModal>
    )
  if (size === 'large')
    return (
      <ProfileCardLarge
        className={cn('h-full shadow-sm', {
          '[background:linear-gradient(90deg,#009684_0%,#006882_98.08%)]':
            theme === 'light',
          '[background:linear-gradient(90deg,#99235e_0%,#6366f1_98.08%)]':
            theme === 'dark',
        })}
        avatar={current?.avatar}
        avatarAlt={current?.full_name}
        name={
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">
              {current?.full_name || 'No children'}
            </span>
            <StudentDetailModal studentId={current?.person_id}>
              <ArrowRight className="text-white" />
            </StudentDetailModal>
          </div>
        }
        subInfo={
          <span className="text-white">
            {current && `${t('class')} ${current?.school_class_short_title}`}
          </span>
        }
        metaData={
          current && <span className="text-white">{current?.email}</span>
        }
        action={
          <StudentsSwitcherModal disabled={!current}>
            <Button className="h-8 w-8 rounded-full bg-primary" size="icon">
              <ArrowsCounterClockwise />
            </Button>
          </StudentsSwitcherModal>
        }
        variant={'large'}
      />
    )
}
