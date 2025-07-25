import {
  ChannelListItem,
  DMChannelListItem,
} from "@/app/pages/messaging/context/channel-list-provider";
import { useCurrentChannelData } from "@/app/pages/messaging/hooks/use-current-channel-data";
import { useContext } from "react";
import {
  ChannelMembers,
  ChannelMembersContext,
  ChannelMembersContextType,
} from "@/app/pages/messaging/context/channel-members-provider";

import { useGetUserRecords } from "@/app/pages/messaging/hooks/use-get-user-records";
import { Box, Flex, Heading, Link, Text } from "@radix-ui/themes";
import { UserAvatar } from "@/app/pages/messaging/components/user-avatar";

import { BiBookmark } from "react-icons/bi";

import { ChannelIcon } from "./channel/channel-icon";
import { AuthContext } from "@/lib/auth/auth-provider";
import { DateMonthYear } from "@/core/utils/date-conversions";

export const EmptyStateForSearch = () => {
  return (
    <Flex justify="center" align="center" className={"w-full h-64"}>
      <Flex direction="column" gap="1" className="text-center">
        <Text weight="bold" size="5">
          Nothing turned up
        </Text>
        <Text as="span" size="2">
          You may want to try using different keywords, checking for typos or
          adjusting your filters.
        </Text>
      </Flex>
    </Flex>
  );
};

interface EmptyStateForChannelProps {
  channelData: ChannelListItem;
  channelMembers: ChannelMembers;
  updateMembers: () => void;
}

const EmptyStateForChannel = ({
  channelData,
  channelMembers,
  updateMembers,
}: EmptyStateForChannelProps) => {
  const { currentUser } = useContext(AuthContext);
  const users = useGetUserRecords();

  return (
    <Flex direction="column" className={"py-4 px-2"} gap="2">
      <Flex direction="column" gap="2">
        <Flex align={"center"} gap="1">
          <ChannelIcon type={channelData?.type} />
          <Heading size="4">{channelData?.channel_name}</Heading>
        </Flex>
        <Text size="2">
          {users[channelData.owner]?.full_name} created this channel on{" "}
          <DateMonthYear date={channelData?.creation} />. This is the very
          beginning of the <strong>{channelData?.channel_name}</strong> channel.
        </Text>
        {channelData?.channel_description && (
          <Text size={"1"} color="gray">
            {channelData?.channel_description}
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

interface EmptyStateForDMProps {
  channelData: DMChannelListItem;
}

const EmptyStateForDM = ({ channelData }: EmptyStateForDMProps) => {
  const peer = channelData.peer_user_id;
  const users = useGetUserRecords();

  return (
    <Box className={"py-4 px-2"}>
      {channelData?.is_direct_message == 1 && (
        <Flex direction="column" gap="2">
          <Flex gap="2">
            <UserAvatar
              alt={users?.[peer]?.full_name ?? peer}
              src={users?.[peer]?.user_image ?? ""}
              size="3"
              skeletonSize="7"
            />
            <Flex direction="column" gap="0">
              <Heading size="4">{users?.[peer]?.full_name}</Heading>
              <Text size="1" color="gray">
                {users?.[peer]?.name}
              </Text>
            </Flex>
          </Flex>
          {channelData?.is_self_message == 1 ? (
            <Flex direction="column" gap="0">
              <Text size="2">
                <strong>This space is all yours.</strong> Draft messages, list
                your to-dos, or keep links and files handy.{" "}
              </Text>
              <Text size="2">
                And if you ever feel like talking to yourself, don't worry, we
                won't judge - just remember to bring your own banter to the
                table.
              </Text>
            </Flex>
          ) : (
            <Flex gap="2" align="center">
              <Text size="2">
                This is a Direct Message channel between you and{" "}
                <strong>{users?.[peer]?.full_name ?? peer}</strong>. Check out
                their profile to learn more about them.
              </Text>
              {/* <Button size='2' variant='ghost' className={'z-1'}>View profile</Button> */}
            </Flex>
          )}
        </Flex>
      )}
    </Box>
  );
};

export const EmptyStateForSavedMessages = () => {
  return (
    <Flex direction="column" className={"pt-24 h-screen px-4"} gap="6">
      <Heading as="h2" size="7" className="cal-sans">
        Your saved messages will appear here
      </Heading>
      <Flex direction="column" gap="1">
        <Text size="3">
          Saved messages are a convenient way to keep track of important
          information or messages you want to refer back to later.
        </Text>
        <Flex align="center" gap="1">
          <Text size="3">
            You can save messages by simply clicking on the bookmark icon
          </Text>
          <BiBookmark />
          <Text size="3">in message actions.</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

interface ChannelHistoryFirstMessageProps {
  channelID: string;
}

export const ChannelHistoryFirstMessage = ({
  channelID,
}: ChannelHistoryFirstMessageProps) => {
  const { channel } = useCurrentChannelData(channelID);
  const { channelMembers, mutate: updateMembers } = useContext(
    ChannelMembersContext,
  ) as ChannelMembersContextType;

  if (channel) {
    // depending on whether channel is a DM or a channel, render the appropriate component
    if (channel.type === "dm") {
      return <EmptyStateForDM channelData={channel.channelData} />;
    }
    if (updateMembers) {
      return (
        <EmptyStateForChannel
          channelData={channel.channelData}
          channelMembers={channelMembers}
          updateMembers={updateMembers}
        />
      );
    }
  }

  return null;
};
