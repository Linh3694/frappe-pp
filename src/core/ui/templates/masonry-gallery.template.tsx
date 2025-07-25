import { cn } from '@/core/utils/shadcn-utils'
import React, {
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  useMemo,
} from 'react'
import styled from 'styled-components'

type Props = HTMLAttributes<HTMLDivElement> & PropsWithChildren & {}

export const MasonryGallery = styled.div`
  & > div {
    grid-template-rows: 1fr auto;
  }
`

export default function MasonryGalleryTemplate({ children, className }: Props) {
  const childrenWithProps = useMemo(
    () =>
      React.Children.map(children, (child) => {
        return <div className="div">
            {child}
        </div>
      }),
    [],
  )

  return (
    <MasonryGallery className={cn('grid grid-cols-3', className)}>
      {childrenWithProps}
    </MasonryGallery>
  )
}
