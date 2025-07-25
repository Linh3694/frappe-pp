import { HTMLAttributes, type FC } from 'react'
import { cn } from '@/core/utils/shadcn-utils'
import { ClassCard } from '@molecules/class-card'
import { Button } from '@atoms/button'
import illuImage1 from '@/assets/illustration-1.png'
import { Users } from 'phosphor-react'
import { useTeacher } from '@/lib/teacher/teacher-provider'
import { useLocales } from '@/core/hooks'
import { useTheme } from '@/lib/shadcn/theme-provider'
import { SchoolClassDetailModal } from '@features/classroom/school-class-detail-modal'

export type OfficialClassCardProps = HTMLAttributes<HTMLDivElement> & {}

export const OfficialClassCard: FC<OfficialClassCardProps> = ({
  className,
}) => {
  const { t } = useLocales()
  const { theme } = useTheme()
  const { schoolClasses } = useTeacher()
  const myClass = schoolClasses?.[0]

  if(!myClass) return <div className="rounded-lg h-[200px] border-2 border-dashed flex items-center justify-center">
    <p className="text-xl font-bold text-center">{t('components.notification.official_class_empty.description')}</p>
  </div>
  return (
    <div className={cn(className)}>
      <ClassCard
        variant="large"
        className={cn('relative p-5 md:p-8', {
          '[background:linear-gradient(90deg,#009684_0%,#006882_98.08%)]':
            theme === 'light',
          '[background:linear-gradient(90deg,#99235e_0%,#6366f1_98.08%)]':
            theme === 'dark',
        })}
        name={
          <p className="text-white">
            {t('common.class_c', { class: myClass?.short_title })}
          </p>
        }
        metaData={
          <p className="flex items-center gap-3 text-white">
            <Users />{' '}
            {t('common.n_students', { number: myClass?.total_students })}
          </p>
        }
        actions={
          <SchoolClassDetailModal classId={myClass?.name}>
            <Button
              className="border-white bg-transparent uppercase text-white hover:bg-white/10 hover:text-white"
              variant="outline"
            >
              {t('components.buttons.view_details')}
            </Button>
          </SchoolClassDetailModal>
        }
        illustration={
          <img
            className="absolute bottom-0 right-0 max-w-full"
            src={illuImage1}
          />
        }
      />
    </div>
  )
}
