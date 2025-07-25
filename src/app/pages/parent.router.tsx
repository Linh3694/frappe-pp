import { Navigate, RouteObject } from 'react-router-dom'
import { MESSAGING_ROUTES } from './messaging/messaging.route'

export const PARENT_HOMEPAGE = "/dashboard"
export const PARENT_ROUTES: RouteObject = {
  path: '',
  lazy: () => import('./parent.layout'),
  children: [
    {
      index: true,
      element: <Navigate replace to={PARENT_HOMEPAGE} />,
    },
    {
      path: 'dashboard',
      lazy: () => import('./dashboard/dashboard.page'),
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
    // {
    //   path: 'messaging',
    //   ...MESSAGING_ROUTES,
    // },
    {
      path: 'student',
      children: [
        {
          path: 'timetable',
          lazy: () => import('./student/timetable/timetable.page'),
        },
        {
          path: 'grades',
          lazy: () => import('./student/grades/grades.page'),
        },
        {
          path: 'attendance',
          lazy: () => import('./student/attendance/attendance.page'),
        },
        {
          path: 'health',
          lazy: () => import('./student/health/health.page'),
        },
        {
          path: 'bus',
          lazy: () => import('./student/bus/bus.page'),
        },
        {
          path: 'menu',
          lazy: () => import('./student/menu/menu.page'),
        },
      ],
    },
    {
      path: 'forms',
      children: [
        {
          path: 'leave-request',
          lazy: () => import('./forms/leave-request/leave-request.page'),
        },
      ],
    },
    {
      path: 'handbook',
      lazy: () => import('./handbook/handbook.page'),
    },
    {
      path: 'notifications',
      lazy: () => import('./notifications/notifications.page'),
    },

    {
      path: 'contacts',
      lazy: () => import('./contacts/contacts.page'),
    },
    {
      path: 'settings',
      lazy: () => import('./settings/settings.page'),
    },
  ],
}
