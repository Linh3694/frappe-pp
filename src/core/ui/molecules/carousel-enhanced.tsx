import React, { HTMLAttributes, PropsWithChildren } from 'react'
import styled from 'styled-components'
import { cn } from '@/core/utils/shadcn-utils'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@atoms/carousel'

type Props = HTMLAttributes<HTMLDivElement> & PropsWithChildren & {}

const CarouselEnhancedStyled = styled(Carousel)``

export default function CarouselEnhanced({ className, children }: Props) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <CarouselEnhancedStyled setApi={setApi} className={cn(className)}>
      <CarouselContent>
        {React.Children.map(children, (child, index) => (
          <CarouselItem key={index}>{child}</CarouselItem>
        ))}
      </CarouselContent>
      {React.Children.count(children) > 1 && (
        <>
          <CarouselPrevious className="left-5" />
          <CarouselNext className="right-5" />
        </>
      )}
      {React.Children.count(children) > 1 && (
        <div className="absolute bottom-2 flex h-5 w-full items-center justify-center gap-2 py-2">
          {Array.from(Array(count).keys()).map((_, key) => (
            <div
              key={key}
              className={cn(
                'dot h-1.5 w-1.5 rounded-full bg-background transition-all duration-300',
                {
                  'h-3 w-3 bg-brand-secondary': key + 1 === current,
                },
              )}
            ></div>
          ))}
        </div>
      )}
    </CarouselEnhancedStyled>
  )
}
