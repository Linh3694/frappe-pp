import { useFrappeEventListener, useFrappeGetCall } from "frappe-react-sdk";
import { UnreadCountData } from "../../context/channel-list-provider";
import { DirectMessageList } from "../direct-message-list";
import { ChannelList } from "../channel/channel-list";
import { Flex, ScrollArea } from "@radix-ui/themes";

export const SidebarBody = () => {
  const { data: unread_count, mutate: update_count } = useFrappeGetCall<{
    message: UnreadCountData
  }>(
    "parent_portal.api.pp_message.get_unread_count_for_channels",
    undefined,
    "unread_channel_count",
    {
      // revalidateOnFocus: false,
    }
  );
  useFrappeEventListener("parent_portal:unread_channel_count_updated", () => {
    update_count();
  });

  return (
    <ScrollArea
      type="hover"
      scrollbars="vertical"
      className="h-[calc(100vh-7rem)]"
    >
      <Flex direction="column" gap="2" className="overflow-x-hidden" px="2">
        <ChannelList unread_count={unread_count?.message} />
        <DirectMessageList unread_count={unread_count?.message} />
      </Flex>
    </ScrollArea>
  );
};
