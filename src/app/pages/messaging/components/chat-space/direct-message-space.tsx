import { DMChannelListItem } from "../../context/channel-list-provider";

import { useContext } from "react";
import {
  ChannelMembersContext,
  ChannelMembersContextType,
} from "../../context/channel-members-provider";
import { DMChannelHeader } from "../chat-header/dm-channel-header";
import { ChatBoxBody } from "../chat-stream/chat-box-body";
import { Box } from "@radix-ui/themes";

interface DirectMessageSpaceProps {
  channelData: DMChannelListItem;
}

export const DirectMessageSpace = ({
  channelData,
}: DirectMessageSpaceProps) => {
  const { channelMembers } = useContext(
    ChannelMembersContext,
  ) as ChannelMembersContextType;

  return (
    <Box>
      <DMChannelHeader
        channelData={channelData}
        channelMembers={channelMembers}
      />
      <ChatBoxBody channelData={channelData} />
    </Box>
  );
};
