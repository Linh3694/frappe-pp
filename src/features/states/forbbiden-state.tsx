import clsx from 'clsx'
import React, { HTMLAttributes } from 'react'
import Announcement from '@molecules/announcement'
import { Plugs, Prohibit, SunHorizon } from 'phosphor-react'
import { useLocales } from '@/core/hooks'

type Props = HTMLAttributes<HTMLDivElement> & {}

export default function ForbiddenState({ className }: Props) {
  const {t} = useLocales()
  return (
    <div className={clsx('flex h-screen w-full justify-center items-center pb-20', className)}>
      <Announcement
        icon={<Prohibit size={180} className="text-brand-teal/30" weight='fill'/>}
        title={t("components.notification.forbbiden.heading")}
        subtitle={t("components.notification.forbbiden.description")}
      />
    </div>
  )
}
