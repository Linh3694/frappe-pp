import { RouteObject, Navigate } from "react-router-dom";

export const AUTH_ROUTES: RouteObject = {
  path: "auth",
  lazy: () => import("./auth.layout"),
  children: [
    {
      index: true,
      element: <Navigate to="login" />,
    },
    {
      path: "login",
      lazy: () => import("./sign-in/page"),
    },
    {
      path: "registration",
      lazy: () => import("./sign-up/sign-up.page"),
    },
    {
      path: "forgot-password",
      lazy: () => import("./forgot-password/forgot-password.page"),
    },
    {
      path: "reset-password/:key",
      lazy: () => import("./reset-password/reset-password.page"),
    }
  ],
};
