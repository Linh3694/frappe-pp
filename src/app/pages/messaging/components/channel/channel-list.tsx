import {
  SidebarGroup,
  SidebarGroupItem,
  SidebarGroupLabel,
  SidebarGroupList,
  SidebarItem,
} from "../chat-sidebar";
import { SidebarBadge, SidebarViewMoreButton } from "../chat-sidebar/sidebar-comp";

import { useContext, useMemo, useState } from "react";
import {
  ChannelListContext,
  ChannelListContextType,
  ChannelListItem,
  UnreadCountData,
} from "../../context/channel-list-provider";

import { clsx } from "clsx";
import { ChannelIcon } from "./channel-icon";

export const ChannelList = ({
  unread_count,
}: {
  unread_count?: UnreadCountData;
}) => {
  const { channels, mutate } = useContext(
    ChannelListContext,
  ) as ChannelListContextType;

  const [showData, setShowData] = useState(true);

  const toggle = () => setShowData((d) => !d);

  const filteredChannels = useMemo(
    () => channels.filter((channel) => channel.is_archived == 0),
    [channels],
  );

  console.log("Channel List", filteredChannels);

  return (
    <SidebarGroup>
      <SidebarGroupItem className={"pl-1.5 gap-2"}>
        <SidebarViewMoreButton onClick={toggle} />
        <div className="flex justify-between items-center w-full gap-2">
          <div className="flex gap-3 items-center">
            <SidebarGroupLabel className="cal-sans">Channels</SidebarGroupLabel>
          </div>
          {!showData &&
            unread_count &&
            unread_count.total_unread_count_in_channels > 0 && (
              <SidebarBadge>
                {unread_count.total_unread_count_in_channels}
              </SidebarBadge>
            )}
        </div>
      </SidebarGroupItem>
      <SidebarGroup>
        <SidebarGroupList>
          {showData &&
            filteredChannels.map((channel) => (
              <ChannelItem
                channel={channel}
                unreadCount={unread_count?.channels ?? []}
                key={channel.name}
              />
            ))}
        </SidebarGroupList>
      </SidebarGroup>
    </SidebarGroup>
  );
};

const ChannelItem = ({
  channel,
  unreadCount,
}: {
  channel: ChannelListItem;
  unreadCount: UnreadCountData["channels"];
}) => {
  const unreadCountForChannel = useMemo(
    () =>
      unreadCount.find((unread) => unread.name == channel.name)?.unread_count,
    [channel.name, unreadCount],
  );

  return (
    <SidebarItem to={channel.name} className="py-1.5">
      <ChannelIcon type={channel.type} className="h-5 w-5" />
      <div className="flex justify-between items-center w-full">
        <span
          className={`text-ellipsis line-clamp-1 ${
            unreadCountForChannel ? "font-bold" : "font-regular"
          }`}
        >
          {channel.channel_name}
        </span>
        {unreadCountForChannel ? (
          <SidebarBadge>{unreadCountForChannel}</SidebarBadge>
        ) : null}
      </div>
    </SidebarItem>
  );
};
