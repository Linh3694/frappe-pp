import { type FC, createContext, useMemo, ReactNode } from "react";

import {
  useFrappeDocTypeEventListener,
  useFrappeGetCall,
  useSWRConfig,
} from "frappe-react-sdk";
import { PPUser } from "@/types/ParentPortal/PPUser";
import { ErrorBanner } from "@atoms/frappe-error-banner";
import { Link } from "react-router-dom";
import FullPageLoader from "@templates/full-page-loader.template";

export type UserFields = Pick<
  PPUser,
  "name" | "full_name" | "user_image" | "first_name" | "enabled"
>;

export const UserListContext = createContext<{
  users: UserFields[];
  enabledUsers: UserFields[];
}>({
  users: [],
  enabledUsers: [],
});

export type UserListProviderProps = {
  children: ReactNode;
};

export const UserListProvider: FC<UserListProviderProps> = ({ children }) => {
  const { mutate: globalMutate } = useSWRConfig();
  const {
    data,
    error: usersError,
    mutate,
    isLoading,
  } = useFrappeGetCall<{ message: UserFields[] }>(
    "parent_portal.api.pp_users.get_list",
    undefined,
    "parent_portal.api.pp_users.get_list",
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useFrappeDocTypeEventListener("PP User", () => {
    mutate();
    // Mutate the channel list as well
    // globalMutate(`channel_list`);
  });

  const { users, enabledUsers } = useMemo(() => {
    return {
      users: data?.message ?? [],
      enabledUsers: data?.message?.filter((user) => user.enabled === 1) ?? [],
    };
  }, [data]);

  console.log("UserListProvider", { users, enabledUsers });

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (usersError) {
    return (
      <div className="flex items-center justify-center px-4 mx-auto w-[50vw] h-screen">
        <ErrorBanner error={usersError} />
      </div>
    );
  }

  return (
    <UserListContext.Provider value={{ users, enabledUsers }}>
      {children}
    </UserListContext.Provider>
  );
};
