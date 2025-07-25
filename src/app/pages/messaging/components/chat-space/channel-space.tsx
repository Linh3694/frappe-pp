import { Box } from "@radix-ui/themes";
import { ChannelListItem } from "../../context/channel-list-provider";
import { ChannelHeader } from "../chat-header/channel-header";
import { ChatBoxBody } from "../chat-stream/chat-box-body";

interface ChannelSpaceProps {
  channelData: ChannelListItem;
}

export const ChannelSpace = ({ channelData }: ChannelSpaceProps) => {
  return (
    <Box className="relative h-full">
      <ChannelHeader channelData={channelData} />
      <ChatBoxBody channelData={channelData} />
    </Box>
  );
};
