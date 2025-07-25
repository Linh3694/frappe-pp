import { Flex, Text } from "@radix-ui/themes";

export const SidebarHeader = () => {
  return (
    <header>
      <Flex justify="between" px="3" align="center" pt="1" height="8">
        <Text as="span" size="6" className="cal-sans pl-1">
          Directory
        </Text>
      </Flex>
    </header>
  );
};
