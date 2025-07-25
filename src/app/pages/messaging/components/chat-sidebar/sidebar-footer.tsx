import { Flex, Separator, Text } from "@radix-ui/themes";
import { useUserData } from "../../hooks/use-user-data";
import { UserAvatar } from "../user-avatar";

export const SidebarFooter = () => {
  const userData = useUserData();

  return (
    <Flex
      gap="1"
      direction="column"
      px="4"
      pb="4"
      bottom="0"
      position="absolute"
      className={`w-full bg-gray-2 border-r-gray-3 border-r dark:bg-gray-1`}
    >
      <Flex direction="column" gap="2">
        <Separator size="4" className={`bg-gray-4 dark:bg-gray-6`} />
        <Flex justify="between" align="center" px="1">
          <Flex gap="2" align="center">
            <UserAvatar
              src={userData.user_image}
              alt={userData.full_name}
              isActive
            />
            <Text size="2">{userData.full_name}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
