import { Navigate, RouteObject } from 'react-router-dom'

export const TEACHER_HOMEPAGE = "/teacher/dashboard"
export const TEACHER_ROUTES: RouteObject = {
  path: 'teacher',
  lazy: () => import('./teacher.layout'),
  children: [
    {
      index: true,
      element: <Navigate replace to={TEACHER_HOMEPAGE} />,
    },
    {
      path: 'dashboard',
      lazy: () => import("./dashboard/dashboard.page"),
    },
    {
      path: 'news',
      // lazy: () => import("./feed/feed.page"),
      children: [
        {
          path: '',
          lazy: () => import('./news/news.page'),
        },
        {
          path: ':id',
          lazy: () => import('./news/news-detail/news-detail.page'),
        },
      ],
    },
    {
      path: 'activities',
      // lazy: () => import("./feed/feed.page"),
      children: [
        {
          path: '',
          lazy: () => import('./feed/feed.page'),
        },
        {
          path: ':id',
          lazy: () => import('./feed/feed-detail/feed-detail.page'),
        },
      ],
    },
    {
      path: 'timetable',
      lazy: () => import('./timetable/timetable.page'),
    },
    {
      path: 'attendance',
      // lazy: () => import("./feed/feed.page"),
      children: [
        {
          path: '',
          lazy: () => import('./attendance/attendance.page'),
        },
        {
          path: 'classes',
          lazy: () =>
            import('./attendance/attendance-classes/attendance-classes.page'),
        },
        {
          path: 'classes/new-record',
          lazy: () =>
            import(
              './attendance/attendance-class-record-detail/attendance-class-record-detail.page'
            ),
        },
        {
          path: 'subjects',
          lazy: () =>
            import('./attendance/attendance-subjects/attendance-subjects.page'),
        },
        {
          path: 'subjects/new-record',
          lazy: () =>
            import(
              './attendance/attendance-subject-record-detail/attendance-subject-record-detail.page'
            ),
        },
      ],
    },
    {
      path: 'settings',
      lazy: () => import('./settings/settings.page'),
    },
  ],
}
