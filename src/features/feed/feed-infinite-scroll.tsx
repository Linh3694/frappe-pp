import { cn } from '@/core/utils/shadcn-utils'
import React, {
  HTMLAttributes,
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import ToggleLikeButton from '@molecules/toggle-like-button'
import { AuthContext } from '@/lib/auth/auth-provider'
import { useToggleLike } from '@/api/feed/use-toggle-like'
import { getRequestURL, useFrappeGetCall, useSWRConfig } from 'frappe-react-sdk'
import PostCard from '@molecules/post-card'
import { Button } from '@atoms/button'
import { Newspaper, NotePencil, Plus, Trash, Tray } from 'phosphor-react'
import ConfirmModal from '@molecules/confirm-modal'
import { useDeleteFeed } from '@/api/feed/use-delete-feed'
import { useGetClassFeed } from '@/api/feed/use-get-class-feed'
import Announcement from '@molecules/announcement'
import InfiniteScroll from '@molecules/infinite-scroll'
import { Skeleton } from '@atoms/skeleton'
import CreateFeedModal from './create-feed-modal'
import { useChildren } from '@/lib/student/children-provider'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@atoms/select'
import { useTeacher } from '@/lib/teacher/teacher-provider'
import { cleanPath } from '@/lib/utils/common'
import { useTranslation } from 'react-i18next'
import { Combobox, ComboboxItemsType, SelectItemType } from '@atoms/combobox'
import { useStack } from '@/core/hooks/use-stack'
import { PostSkeleton } from '@molecules/post-skeleton'

type Props = HTMLAttributes<HTMLDivElement> & {
  isManager?: boolean
}
const GetMoreCount = 3
export default function FeedInfiniteScroll({ className, isManager }: Props) {
  const { t } = useTranslation()
  const { currentUser, userInfo, prefixRoute } = useContext(AuthContext)
  const { schoolClasses, courseClasses } = useTeacher()
  const { current } = useChildren()
  const { mutate } = useSWRConfig()
  // Data
  const [page, setPage] = useState<number>(1)
  const [filterClass, setFilterClass] = useState<string>()
  const {
    feeds,
    currentPage,
    totalPage,
    totalCount,
    error,
    isLoading,
    isValidating,
  } = useGetClassFeed(
    {
      personId: (isManager ? userInfo?.name : current?.person_id) || '',
      limit: GetMoreCount,
      page,
      filters: filterClass,
    },
    !current?.person_id && !userInfo?.name,
  )
  const { stack, pending, addItems, removeItems, resetStack } = useStack<
    (typeof feeds)[0]
  >({
    addValidator: (a, b) => a.name === b.name,
    duplicateValidator: (a, b) => {
      let t1 = new Date(a.modified).getTime()
      let t2 = new Date(b.modified).getTime()
      return t2 > t1
    },
    removeValidator: (a, b) => a.name === b.name,
  })

  const { handleToggle } = useToggleLike()
  const [deleteSelected, setDeleteSelected] = useState<(typeof feeds)[0]>()
  const { handleDelete } = useDeleteFeed('SIS Class Feed')

  const classOptions = useMemo<ComboboxItemsType>(
    () => [
      {
        label: t('components.inputs.select_class.all_item'),
        value: '{}',
      },
      {
        heading: t('common.official_class'),
        children: (schoolClasses || []).map((c) => ({
          label: t('common.class_c', { class: c.short_title }),
          value: JSON.stringify({ school_class: c.name }),
        })),
      },
      {
        heading: t('common.course_class'),
        children: (courseClasses || []).map((c) => ({
          label: c.title,
          value: JSON.stringify({ course_class: c.name }),
        })),
      },
    ],
    [JSON.stringify(schoolClasses), JSON.stringify(courseClasses)],
  )
  // console.log(classOptions)

  const onClickToggleLike = async (feedId: string, index: number) => {
    try {
      await handleToggle('SIS Class Feed', feedId, index)
      let target = stack.find((i) => i.name == feedId)
      if (!!target) {
        let selfIdx =
          target?.likedBy?.findIndex((x: string) => x === currentUser) ?? -1
        if (selfIdx != -1) {
          target?.likedBy.splice(selfIdx, 1)
        } else {
          if (!target?.likedBy) {
            target.likedBy = []
          }
          target?.likedBy.push(currentUser)
        }
        target.modified = (new Date()).toISOString().replace('T', ' ').replace('Z', '').slice(0, 26)
        addItems([target])
      }
    } catch (error) {
      console.log('ERROR CLICK LIKE:', error)
    }
  }

  const handleClickDelete = async () => {
    if (deleteSelected) {
      try {
        await handleDelete(deleteSelected.name)
        removeItems([deleteSelected])
      } catch (error) {}
      setDeleteSelected(undefined)
    }
  }

  const increasePage = () => {
    if (!isLoading && !isValidating) {
      setPage((page) => {
        return page + 1
      })
    }
  }

  const handleSelectClasses = (filter: string) => {
    setFilterClass(filter)
    setPage(1)
    resetStack([])
  }

  const onCreateFeed = () => {
    setPage(1)
    resetStack([])
  }

  useEffect(() => {
    if (feeds.length > 0) {
      addItems(feeds)
    }
  }, [JSON.stringify(feeds), filterClass])

  useEffect(() => {
    if (current?.person_id) {
      page !== 1 && setPage(1)
      stack.length > 0 && resetStack([])
    }
  }, [current?.person_id])

  return (
    <div>
      {isManager && (
        <div className="mb-5 flex justify-between gap-5">
          <Combobox
            className="basix-1/2 sm:basis-1/3"
            dropdownClassName="min-w-[300px] sm:min-w-[250px]"
            items={classOptions}
            placeholder={t('components.inputs.filter_class.placeholder')}
            emptyContent={t('components.inputs.filter_class.empty')}
            searchPlaceholder={t(
              'components.inputs.filter_class.search_placeholder',
            )}
            value={filterClass}
            onSelect={handleSelectClasses}
          />
          <CreateFeedModal onSubmitForm={onCreateFeed}>
            <Button className={cn('space-x-3', className)}>
              <Plus size={16} />
              <span>{t('components.buttons.add_feed')}</span>
            </Button>
          </CreateFeedModal>
        </div>
      )}
      {
        !isValidating && stack.length === 0 && <Announcement
          className={'!gap-1'}
          icon={
            <Newspaper
              size={100}
              weight="fill"
              className="text-muted-foreground opacity-20"
            />
          }
          title={
            <h4 className="text-2xl font-bold opacity-80">
              {t('components.notification.activities_empty.heading')}
            </h4>
          }
          subtitle={
            <p className="text-lg text-muted-foreground">
              {t('components.notification.activities_empty.description')}
            </p>
          }
          hidden={stack.length === 0 && !isValidating}
        />
      }
      <InfiniteScroll
        loader={<PostSkeleton />}
        loading={false}
        fetchMore={increasePage}
        hasMore={stack.length < totalCount}
      >
        {stack.map((item, index) => (
          <PostCard
            key={item.name}
            title={item.title}
            desc={item.description}
            photos={item.attachments?.map((p) => p.file_url)}
            authorName={`${item.owner?.full_name || 'Unknown'} - ${t('class')} ${item.school_class?.short_title || item.course_class.title}`}
            authorImage={item.owner?.user_image || 'Unknown'}
            timeAt={item.creation}
            url={cleanPath(`/${prefixRoute}/activities/${item.name}`)}
            className="mb-5 break-inside-avoid"
            menuSettings={
              (isManager && [
                {
                  label: (
                    <Button
                      className="space-x-2 p-0 text-destructive"
                      variant="link"
                    >
                      <Trash size={18} />
                      <span className="text-sm">
                        {t('components.buttons.delete_feed')}
                      </span>
                    </Button>
                  ),
                  onClick: () => setDeleteSelected(item),
                },
              ]) ||
              undefined
            }
            actions={
              <div className="flex items-center gap-3">
                <ToggleLikeButton
                  active={item.likedBy?.includes(currentUser)}
                  count={item.likedBy?.length}
                  onClick={() => onClickToggleLike(item.name, index)}
                  disabled={pending}
                />
              </div>
            }
          />
        ))}
      </InfiniteScroll>
      <ConfirmModal
        open={!!deleteSelected}
        variant="typing"
        title="Delete feed?"
        subtitle="Are you sure you want to delete this feed?"
        inputSetting={{
          inputLabel: 'Type DELETE to confirm',
          textConfirm: 'DELETE',
        }}
        confirmButtonProps={{ variant: 'destructive' }}
        confirmButtonText="Delete"
        onConfirm={handleClickDelete}
        onClose={() => setDeleteSelected(undefined)}
      ></ConfirmModal>
    </div>
  )
}
