import {
  HTMLAttributes,
  ReactNode,
  useState,
  useTransition,
  type FC,
} from 'react'
import { cn } from '@/core/utils/shadcn-utils'
import { Input } from '@atoms/input'
import { InputGroup } from '@molecules/input-group'
import { Loader2, SearchIcon, UserSearch } from 'lucide-react'
import { Avatar, AvatarImage } from '@atoms/avatar'
import { Button } from '@atoms/button'
import { ScrollArea } from '@atoms/scroll-area'
import { format } from 'date-fns'
import { getDateLocale } from '@/lib/utils/common'
import { useLocales, useResponsive } from '@/core/hooks'
import Announcement from '../../core/ui/molecules/announcement'
import { NoResult } from '@features/empty/NoResult'
import { MagnifyingGlass, WarningCircle } from 'phosphor-react'
import { StudentDetailModal } from './student-detail-modal'
import { PersonListItem } from '@molecules/person-list-item'

export type StudentDataItem = {
  id: string
  name: string
  avatar?: string
  dateOfBirth?: Date
}

export type StudentListProps = HTMLAttributes<HTMLDivElement> & {
  list?: StudentDataItem[]
  loading?: boolean
  loader?: ReactNode
}

export const StudentList: FC<StudentListProps> = ({
  className,
  list,
  loading,
  loader,
}) => {
  const { currentLanguage } = useLocales()
  const { t } = useLocales()
  const { isDesktop } = useResponsive()
  const [keyword, setKeyword] = useState('')
  const [isPending, startTransition] = useTransition()
  const [studentSelected, setStudentSelected] = useState<string>()

  const handleSearch = (text: string) => {
    !isPending &&
      startTransition(() => {
        setKeyword(text)
      })
  }

  return (
    <div className={cn('', className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <InputGroup
          className="w-full sm:max-w-[50%]"
          inputClassName="pr-12"
          placeholder={t('components.inputs.search_students.placeholder')}
          suffix={
            <SearchIcon className="mr-4 h-4 w-4 text-muted-foreground/50" />
          }
          onChange={(e) => handleSearch(e.target.value)}
        />
        <p className="text-right text-sm font-bold text-primary">
          {t('common.total_n_students', { number: list?.length || 0 })}
        </p>
      </div>
      <ScrollArea className="mt-5 flex max-h-[50vh] flex-col gap-10 rounded-lg border p-5">
        {loading && (
          <center>
            {loader || <Loader2 className="mr-2 h-6 w-6 animate-spin" />}
          </center>
        )}
        {!loading &&
          list
            ?.filter((s) =>
              s.name.toLowerCase().includes(keyword.toLowerCase()),
            )
            .map((dataItem, key) => (
              <PersonListItem
                className="mb-3"
                name={dataItem.name}
                metadata={
                  dataItem.dateOfBirth &&
                  format(dataItem.dateOfBirth, 'P', {
                    locale: getDateLocale(currentLanguage),
                  })
                }
                action={
                  <StudentDetailModal studentId={studentSelected}>
                    {isDesktop ? (
                      <Button
                        variant="outline"
                        onClick={() => setStudentSelected(dataItem.id)}
                      >
                        {t('common.view_info')}
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setStudentSelected(dataItem.id)}
                      >
                        <UserSearch strokeWidth={1.5} />
                      </Button>
                    )}
                  </StudentDetailModal>
                }
              />
            ))}
        {!loading &&
          list?.filter((s) =>
            s.name.toLowerCase().includes(keyword.toLowerCase()),
          ).length === 0 && (
            <Announcement
              icon={
                <MagnifyingGlass
                  size={40}
                  weight="thin"
                  className="mb-0 text-muted-foreground/70"
                />
              }
              title={
                <p className="text-sm">
                  {t('components.notification.no_results.heading')}
                </p>
              }
            />
          )}
      </ScrollArea>
    </div>
  )
}

export type StudentListItemProps = HTMLAttributes<HTMLDivElement> & {
  data?: StudentDataItem
  action?: ReactNode
}
