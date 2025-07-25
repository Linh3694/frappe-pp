import { SISClassFeed } from '../SIS/SISClassFeed'
import { FrappeMeta } from './FrappeMeta'

export type ClassFeedExtend = Omit<SISClassFeed, 'owner'|'course_class'|'school_class'> &
  FrappeMeta & {
    attachments: {
      name: string
      file_url: string
    }[]
    school_class:{
      name:string
      title:string
      short_title:string
    }
    course_class:{
      name:string
      title:string
      short_title:string
    }
    owner: {
      full_name: string
      user_image: string
      user: string
      person: string
    }
  }
