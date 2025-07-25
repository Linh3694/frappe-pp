import { cn } from '@/core/utils/shadcn-utils'
import { log } from 'console'
import React, {
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
} from 'react'

type Props = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren & {
    loader: ReactNode
    loading?: ReactNode
    fetchMore: () => void
    hasMore: boolean
  }

const InfiniteScroll = ({
  children,
  loader,
  loading,
  fetchMore,
  hasMore,
  className,
}: Props) => {
  const pageEndRef = useRef(null)
  useEffect(() => {
    if (hasMore) {
      const observer = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting) {
          // kiểm tra element có nằm trong viewport không?
          fetchMore()
        }
      })

      if (pageEndRef.current) {
        observer.observe(pageEndRef.current)
      }

      return () => {
        if (pageEndRef.current) {
          observer.unobserve(pageEndRef.current)
        }
      }
    }
  }, [hasMore])
  return (
    <div className={className}>
      {children}
      {loading && <div className="loading flex flex-col gap-5">{loader}{loader}</div>}
      {hasMore && <div ref={pageEndRef}>{loader}</div>}
    </div>
  )
}

export default InfiniteScroll
