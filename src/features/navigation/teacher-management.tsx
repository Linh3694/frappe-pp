import { useLocales } from '@/core/hooks'
import FeatureItem from '@molecules/feature-item'
import { ItemOptionsType } from '@molecules/nav-menu'
import PegBoard from '@molecules/pegboard'
import clsx from 'clsx'
import { UserCheck } from 'lucide-react'
import {
  BookOpen,
  Bus,
  Calendar,
  CalendarCheck,
  CheckSquare,
  ForkKnife,
  Heart,
  Newspaper,
  NotePencil,
  PersonSimpleRun,
} from 'phosphor-react'
import React, { HTMLAttributes, PropsWithChildren, useMemo } from 'react'
import { Link } from 'react-router-dom'

type Props = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    label?: string
  }

export default function TeacherManagement({ className }: Props) {
  const { t } = useLocales()

  const ManagementItems: ItemOptionsType[] = useMemo(
    () => [
      {
        key: 'news',
        label: t('components.menu.news_events'),
        path: '/teacher/news',
        icon: (
          <div className="rounded-xl bg-brand-red/10 p-2 ">
            <Newspaper size={28} className="text-brand-red" weight="duotone"/>
          </div>
        ),
      },
      {
        key: 'activities',
        label: t('components.menu.activities'),
        path: '/teacher/activities',
        icon: (
          <div className="rounded-xl bg-brand-orange/10 p-2 ">
            <PersonSimpleRun size={28} className="text-brand-orange" weight="duotone"/>
          </div>
        ),
      },
      {
        key: 'timetable',
        label: t('components.menu.timetable'),
        path: '/teacher/timetable',
        icon: (
          <div className="rounded-xl bg-brand-blue/10 p-2 ">
            <Calendar size={28} className="text-brand-blue" weight="duotone"/>
          </div>
        ),
      },
      {
        key: 'attendance',
        label: t('components.menu.attendance'),
        path: '/teacher/attendance',
        icon: (
          <div className="rounded-xl bg-brand-green/10 p-2 ">
            <CalendarCheck size={28} className="text-brand-green" weight="duotone"/>
          </div>
        ),
      }
    ],
    [t],
  )

  return (
    <PegBoard label={t('common.class_management')}>
      {ManagementItems?.map(
        (item, index) =>
          item.icon && (
            <Link
              key={index}
              to={item.path || ''}
              className={'w-fit'}
              style={{ pointerEvents: item.disabled ? 'none' : 'all' }}
            >
              <FeatureItem
                icon={item.icon}
                label={item.label}
                disabled={item.disabled}
              />
            </Link>
          ),
      )}
    </PegBoard>
  )
}
