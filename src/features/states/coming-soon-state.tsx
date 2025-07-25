import clsx from 'clsx'
import React, { HTMLAttributes } from 'react'
import Announcement from '@molecules/announcement'
import { Plugs, SunHorizon } from 'phosphor-react'
import { useLocales } from '@/core/hooks'

type Props = HTMLAttributes<HTMLDivElement> & {}

export default function ComingSoonState({ className }: Props) {
  const { t } = useLocales()
  return (
    <div className={clsx('flex h-screen w-full items-center pb-20', className)}>
      <Announcement
        icon={<SunHorizon size={120} />}
        title={t("components.notification.coming_soon.heading")}
        subtitle={t("components.notification.coming_soon.description")}
      />
    </div>
  )
}
