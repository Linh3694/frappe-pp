import { useContext, useMemo } from "react";
import { UserFields, UserListContext } from "../context/user-list-provider";

export const useGetUserRecords = () => {
  const { users } = useContext(UserListContext);

  const allUsers: Record<string, UserFields> = useMemo(() => {
    const usersMap: Record<string, UserFields> = {};
    users.forEach((user) => {
      usersMap[user.name] = {
        name: user.name,
        full_name: user.full_name,
        user_image: user.user_image ?? "",
        first_name: user.first_name,
        enabled: user.enabled,
      };
    });
    return usersMap;
  }, [users]);

  return allUsers;
};
