import env from '@/config/env'
import { cn } from '@/core/utils/shadcn-utils'
import { cleanPath } from '@/lib/utils/common'
import React from 'react'
import { Badge } from '@atoms/badge'

type Props = {
	className?: string
	variant?: 'default' | 'white'
}

export default function Logo({ className, variant = 'default' }: Props) {

  return (
    <div className={cn('', className)}>
      <img
        alt="Logo Wellspring SaiGon"
        className={`h-full w-full object-contain`}
        src={cleanPath(`${env.ASSET_URL}${variant == 'default' ? `/static/ws-logo-full.png` : `/static/ws-logo-white.png`}`)}
      />
    </div>
  )
}
