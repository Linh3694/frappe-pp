import React, { HTMLAttributes, ReactNode } from 'react'
import { Button } from '@atoms/button'
import { Avatar, AvatarFallback, AvatarImage } from '@atoms/avatar'
import { cn } from '@/core/utils/shadcn-utils'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@atoms/tabs'
import styled from 'styled-components'
import { Separator } from '@atoms/separator'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@atoms/accordion'
import { useLocales } from '@/core/hooks'

type Props = HTMLAttributes<HTMLDivElement> & {
  profileSettings?: ReactNode
  securitySettings?: ReactNode
  appearanceSettings?: ReactNode
}

const TabStyled = styled(Tabs)`
  .tab-sidebar {
  }
`

export default function SettingsPageTemplate({
  className,
  profileSettings,
  securitySettings,
  appearanceSettings,
}: Props) {
  const { t } = useLocales()
  return (
    <div className={cn('mx-auto max-w-4xl', className)}>
      <Accordion
        type="single"
        defaultValue="item-1"
        collapsible
        className="w-full"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <p className="text-xl font-bold text-primary">
              {t('common.account_profile')}
            </p>
          </AccordionTrigger>
          <AccordionContent className="px-1">
            {profileSettings}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            <p className="text-xl font-bold text-primary">
              {t('common.password_security')}
            </p>
          </AccordionTrigger>
          <AccordionContent className="px-1">
            {securitySettings}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            <p className="text-xl font-bold text-primary">
              {t('common.preferences')}
            </p>
          </AccordionTrigger>
          <AccordionContent className="px-1">
            {appearanceSettings}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
