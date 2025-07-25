import { cleanPath } from '@/lib/utils/common'
import env from './env'

export default {
  page: (path: string) => cleanPath(`/${env.BASE_NAME}/${path}`),
  dashboard: () => cleanPath(`/${env.BASE_NAME}`),
  news: (rolePath:string) => cleanPath(`/${env.BASE_NAME}/${rolePath}/news`),
  login: cleanPath(`/${env.BASE_NAME}/auth/login`),
  
}
