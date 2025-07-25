import { HTMLAttributes, type FC } from 'react'
import { cn } from '@/core/utils/shadcn-utils'
import { Carousel, CarouselContent, CarouselItem } from '@atoms/carousel'
import { useTeacher } from '@/lib/teacher/teacher-provider'
import { ClassCard } from '@molecules/class-card'
import Autoplay from 'embla-carousel-autoplay'
import { useLocales } from '@/core/hooks'
import { Button } from '@atoms/button'
import { coursePalatte } from '@/core/constant/palette'
import { stringHashToNumber } from '@/lib/utils/common'
import { darken } from 'polished'
import { useTheme } from '@/lib/shadcn/theme-provider'
import { CourseClassDetailModal } from '@features/classroom/course-class-detail-modal'

export type CoursesSliderProps = HTMLAttributes<HTMLDivElement> & {}

export const CoursesSlider: FC<CoursesSliderProps> = ({ className }) => {
  const { t } = useLocales()
  const { theme } = useTheme()
  const { courseClasses } = useTeacher()

  if (!courseClasses)
    return (
      <div className="flex h-[200px] items-center justify-center rounded-lg border-2 border-dashed">
        <p className="text-center text-xl font-bold">
          {t('components.notification.class_not_found.heading')}
        </p>
      </div>
    )
  return (
    <div className={cn(className)}>
      <Carousel
        className="w-full"
        opts={{
          active: courseClasses?.length > 1,
        }}
        plugins={[Autoplay({ delay: 2000 })]}
      >
        <CarouselContent>
          {courseClasses.map((course, index) => (
            <CarouselItem
              key={course.name + index}
              className={cn({
                'basis-full': courseClasses?.length === 1,
                'basis-[80%] sm:basis-[66%] md:basis-[60%]':
                  courseClasses?.length > 1,
              })}
            >
              <ClassCard
                className={cn(
                  'relative overflow-hidden p-5 pt-[60px] md:pt-[110px]',
                  "before:absolute before:right-[-80px] before:top-[45px] before:h-[200px] before:w-[200px] before:rounded-full before:border-[20px] before:border-white/10 before:content-[''] sm:before:right-[-100px] sm:before:top-[50px] sm:before:h-[300px] sm:before:w-[300px] sm:before:border-[30px]",
                  "after:absolute after:left-[-90px] after:top-[-130px] after:h-[200px] after:w-[200px] after:rounded-full after:border-[20px] after:border-white/10 after:content-[''] sm:after:left-[-110px] sm:after:top-[-200px] sm:after:h-[300px] sm:after:w-[300px] sm:after:border-[30px]",
                )}
                name={
                  <p className="line-clamp-1 text-lg text-white sm:text-2xl">
                    {course.title}
                  </p>
                }
                metaData={
                  <div className="flex justify-between gap-2">
                    <p className="text-sm text-white opacity-70">
                      {t('common.n_students', {
                        number: course.total_students,
                      })}
                    </p>
                    <CourseClassDetailModal classId={course.name}>
                      <Button
                        variant="outline"
                        className="border-white bg-transparent !text-white shadow-none hover:bg-white/10"
                      >
                        {t('components.buttons.view_details')}
                      </Button>
                    </CourseClassDetailModal>
                  </div>
                }
                style={{
                  backgroundColor: darken(
                    theme === 'dark' ? 0.6 : 0.5,
                    coursePalatte[
                      stringHashToNumber(course.name, coursePalatte.length)
                    ].bg,
                  ),
                }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
  <CarouselNext /> */}
      </Carousel>
    </div>
  )
}
