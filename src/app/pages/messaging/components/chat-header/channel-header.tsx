import { PageHeader } from "../page-header";
import { ChannelIcon } from "../channel/channel-icon";
import { ChannelListItem } from "../../context/channel-list-provider";
import { Flex, Heading } from "@radix-ui/themes";

interface ChannelHeaderProps {
  channelData: ChannelListItem;
}

export const ChannelHeader = ({ channelData }: ChannelHeaderProps) => {
  // The channel header has the channel name, the channel type icon, edit channel name button, and the view or add members button

  return (
    <PageHeader>
      <Flex gap="4" align={"center"}>
        <Flex gap="1" align={"center"}>
          <ChannelIcon type={channelData.type} size="20" />
          <Heading size="5" className="mb-0.5">
            {channelData.channel_name}
          </Heading>
        </Flex>
        {/* <EditChannelNameButton
          channelID={channelData.name}
          channel_name={channelData.channel_name}
          channelType={channelData.type}
          disabled={channelData.is_archived == 1}
        /> */}
      </Flex>
      <Flex gap="2">
        {/* <ViewFilesButton /> */}
        {/* <SearchButton /> */}
        {/* <ViewOrAddMembersButton channelData={channelData} /> */}
      </Flex>
    </PageHeader>
  );
};