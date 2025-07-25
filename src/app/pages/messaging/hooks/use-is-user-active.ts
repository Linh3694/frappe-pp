import { AuthContext } from "@/lib/auth/auth-provider";
import { useContext, useMemo } from "react";
import { ActiveUsersContext } from "../context/active-users-provider";

export const useIsUserActive = (userID?: string): boolean => {
  const { currentUser } = useContext(AuthContext);
  const activeUsers = useContext(ActiveUsersContext);

  const isActive = useMemo(() => {
    if (userID === currentUser) {
      return true;
    } else if (userID) {
      return activeUsers.includes(userID);
    } else {
      return false;
    }
  }, [userID, activeUsers]);

  return isActive;
};
