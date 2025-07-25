import { HTMLAttributes, type FC } from 'react'
import { cn } from '@/core/utils/shadcn-utils'
import {
  Worker,
  Viewer,
  SpecialZoomLevel,
  PageChangeEvent,
} from '@react-pdf-viewer/core'

export type PdfReaderProps = HTMLAttributes<HTMLDivElement> & {
  url?: string
  onChangePage?: (e: PageChangeEvent) => void
}

import '@react-pdf-viewer/core/lib/styles/index.css'
import { useTheme } from '@/lib/shadcn/theme-provider'
export const PDFReader: FC<PdfReaderProps> = ({
  className,
  url,
  onChangePage,
}) => {
  const { theme } = useTheme()
  if (!url) return null
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
      <Viewer
        onPageChange={onChangePage}
        fileUrl={url}
        defaultScale={SpecialZoomLevel.PageWidth}
        theme={theme}
      />
    </Worker>
  )
}
