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

export default function StudentManagement({ className }: Props) {
  const { t } = useLocales()

  const ManagementItems: ItemOptionsType[] = useMemo(
    () => [
      {
        key: 'news',
        label: t('components.menu.news_events'),
        path: '/news',
        icon: (
          <div className="rounded-xl bg-brand-red/10 p-2 ">
            <Newspaper size={28} className="text-brand-red" weight="duotone"/>
          </div>
        ),
      },
      {
        key: 'activities',
        label: t('components.menu.activities'),
        path: '/activities',
        icon: (
          <div className="rounded-xl bg-brand-orange/10 p-2 ">
            <PersonSimpleRun size={28} className="text-brand-orange" weight="duotone"/>
          </div>
        ),
      },
      {
        key: 'timetable',
        label: t('components.menu.timetable'),
        path: '/student/timetable',
        icon: (
          <div className="rounded-xl bg-brand-blue/10 p-2 ">
            <Calendar size={28} className="text-brand-blue" weight="duotone"/>
          </div>
        ),
      },
      {
        key: 'attendance',
        label: t('components.menu.attendance'),
        path: '/student/attendance',
        icon: (
          <div className="rounded-xl bg-brand-green/10 p-2 ">
            <CalendarCheck size={28} className="text-brand-green" weight="duotone"/>
          </div>
        ),
      },
      {
        key: 'leave-request',
        label: t('components.menu.leave_request'),
        path: '/forms/leave-request',
        icon: (
          <div className="rounded-xl bg-brand-secondary/10 p-2 ">
            <NotePencil size={28} className="text-brand-secondary" weight="duotone"/>
          </div>
        ),
        disabled: true,
      },
      {
        key: 'grades',
        label: t('components.menu.grades'),
        path: '/student/grades',
        icon: (
          <div className="rounded-xl bg-brand-teal/10 p-2 ">
            <BookOpen size={28} className="text-brand-teal" weight="duotone"/>
          </div>
        ),
        disabled: true,
      },
      {
        key: 'health',
        label: t('components.menu.health'),
        path: '/student/health',
        icon: (
          <div className="rounded-xl bg-brand-red/10 p-2 ">
            <Heart size={28} className="text-brand-red" weight="duotone" />
          </div>
        ),
        disabled: true,
      },
      {
        key: 'bus',
        label: t('components.menu.bus'),
        path: '/student/bus',
        icon: (
          <div className="rounded-xl bg-brand-yellow/10 p-2 ">
            <Bus size={28} className="text-brand-yellow" weight="duotone"/>
          </div>
        ),
        disabled: true,
      },
      {
        key: 'menu',
        label: t('components.menu.food_menu'),
        path: '/student/menu',
        icon: (
          <div className="rounded-xl bg-brand-violet/10 p-2 ">
            <ForkKnife size={28} className="text-brand-violet" weight="duotone"/>
          </div>
        ),
        disabled: true,
      }
    ],
    [t],
  )

  return (
    <PegBoard label={t('student_management')}>
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
