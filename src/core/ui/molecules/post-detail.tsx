import { useLocales } from '@/core/hooks'
import { cn } from '@/core/utils/shadcn-utils'
import { getDateLocale } from '@/lib/utils/common'
import { format } from 'date-fns'
import _ from 'lodash'
import styled from 'styled-components'
import { PDFReader } from './pdf-reader'

type Props = {
  className?: string
  pubDate?: string
  modifiedAt?: string
  title?: string
  desc?: string
  thumbnail?: string
  content?: string
  contentType?: 'text' | 'image' | 'pdf'
}

const ContentHTMLStyled = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  span,
  b,
  i,
  u,
  strong,
  em {
    color: hsl(var(--foreground)) !important;
  }
  .ql-editor {
    text-align: justify;
  }
`

export default function PostDetail({
  className,
  pubDate,
  title,
  desc,
  thumbnail,
  modifiedAt,
  content,
  contentType = 'text',
}: Props) {
  const { currentLanguage } = useLocales()

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-4 rounded-lg p-2 text-justify md:p-4',
        className,
      )}
    >
      {pubDate && (
        <span className="text-md space-x-1 font-medium text-gray-600 sm:text-lg">
          <span>Published</span>
          <span>
            {format(pubDate, 'PP - p', {
              locale: getDateLocale(currentLanguage),
            })}
          </span>
        </span>
      )}
      <h1 className="mb-5 text-center text-[1.75rem] text-xl font-bold leading-[30px] text-primary sm:mb-10 sm:leading-[2.3rem] md:text-2xl md:text-[2rem] md:leading-[3.2rem] lg:mb-20 lg:text-[2.5rem] lg:leading-[4rem] xl:text-[2.75rem] xl:leading-[4.2rem]">
        {title}
      </h1>
      {thumbnail && (
        <img className="mb-10" src={thumbnail} alt={thumbnail + '_' + title} />
      )}
      <div className="text-md mb-2 md:mb-5 font-medium leading-[28px] text-foreground/70 sm:leading-[30px] lg:text-[20px]">
        {desc}
      </div>
      {content && contentType == 'pdf' && (
        <PDFReader url={`${content}?update_at=${modifiedAt}`} />
      )}
      {content && contentType == 'image' && (
        <img
          className="w-full"
          src={`${content}?update_at=${modifiedAt}`}
          alt="the-content-is-an-image"
        />
      )}
      {content && contentType == 'text' && (
        <ContentHTMLStyled
          className="max-w-full !font-medium"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  )
}
