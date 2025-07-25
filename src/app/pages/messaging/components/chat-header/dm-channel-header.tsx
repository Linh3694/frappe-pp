import { useIsUserActive } from "../../hooks/use-is-user-active";
import { DMChannelListItem } from "../../context/channel-list-provider";
import { ChannelMembers } from "../../context/channel-members-provider";
import { PageHeader } from "../page-header";
import { Flex, Heading } from "@radix-ui/themes";
import { UserAvatar } from "../user-avatar";

interface DMChannelHeaderProps {
  channelData: DMChannelListItem;
  channelMembers: ChannelMembers;
}

export const DMChannelHeader = ({
  channelData,
  channelMembers,
}: DMChannelHeaderProps) => {
  // There are two people in a DM channel, the user (you) and the peer (the other person)
  // If channelData.is_self_message is 1, then the user is having a conversation with themself

  const peer = channelData.peer_user_id;
  const isActive = useIsUserActive(channelData.peer_user_id);
  return (
    <PageHeader>
      <Flex gap="2" align="center">
        <UserAvatar
          key={peer}
          alt={channelMembers?.[peer]?.full_name ?? peer}
          src={channelMembers?.[peer]?.user_image ?? ""}
          isActive={isActive}
          skeletonSize="6"
          size="2"
        />
        <Heading size="5">{channelMembers?.[peer]?.full_name ?? peer}</Heading>
      </Flex>
      <Flex gap="2">{/* <SearchButton /> */}</Flex>
    </PageHeader>
  );
};
