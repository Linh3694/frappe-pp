import {
  Navigate,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
  useLocation,
  useRouteError,
} from 'react-router-dom'
import { AUTH_ROUTES } from './auth/auth.route'
import { FC, PropsWithChildren, useEffect } from 'react'
import { PARENT_HOMEPAGE, PARENT_ROUTES } from './pages/parent.router'
import { TEACHER_HOMEPAGE, TEACHER_ROUTES } from './teacher/teacher.router'
import env from '@/config/env'
import { useAuthContext, USER_ROLE } from '@/lib/auth/auth-provider'
import NoPermissionState from '@features/states/no-permisson-state'
import FullPageLoaderTemplate from '@templates/full-page-loader.template'

const router = (isLogged: boolean, role?: USER_ROLE | null) => {
  let routes: RouteObject = {
    path: '/',
    lazy: () => import('./layout'),
    children: [],
  }
  // console.log('role', role)

  if (role === USER_ROLE.GUARDIAN) {
    routes?.children?.push({
      index: true,
      element: <Navigate replace to={PARENT_HOMEPAGE} />,
    })
    routes?.children?.push({
      path: '*',
      ...PARENT_ROUTES,
    })
  }
  else if (role === USER_ROLE.TEACHER) {
    routes?.children?.push({
      index: true,
      element: <Navigate replace to={TEACHER_HOMEPAGE} />,
    })
    routes?.children?.push({
      path: 'teacher/*',
      ...TEACHER_ROUTES,
    })
  }
  else if (role === null) {
    routes?.children?.push({
      index: true,
      element: <NoPermissionState />,
    })
    routes?.children?.push({
      path: '*',
      element: <NoPermissionState />,
    })
  }
  else if (!isLogged || role === undefined) {
    routes?.children?.push({
      index: true,
      element: <Navigate replace to={'/auth/login'} />,
    })
    routes?.children?.push({
      path: 'auth/*',
      ...AUTH_ROUTES,
    })
    routes?.children?.push({
      path: '*',
      element: <Navigate replace to={'/auth/login'} />,
    })
  }

  // console.log(routes)

  // Only use basename in production
  const basename = import.meta.env.PROD 
    ? (import.meta.env.VITE_BASE_NAME === '/' ? '' : import.meta.env.VITE_BASE_NAME)
    : '';
  
  console.log('🛤️ Router basename:', basename);
  
  return createBrowserRouter([routes], basename ? { basename } : {})
}

export type GlobalErrorProps = {
  className?: string
}

export const GlobalError: FC<GlobalErrorProps> = () => {
  const error = useRouteError()

  if (import.meta.env.MODE !== 'development' && error) {
    console.log(error)
  }

  return (
    <div className="flex min-h-[100vh] flex-col items-center gap-6">
      <h1>Something went wrong</h1>
    </div>
  )
}

const RootRouter = () => {
  const { currentUser, isLoading, userRole, userInfo } = useAuthContext()

  if (isLoading) return <FullPageLoaderTemplate />
  return <RouterProvider router={router(!!currentUser, userRole)} />
}

export default RootRouter
