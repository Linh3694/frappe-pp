import type { FC } from "react";

import { useEffect } from "react";

import { useSWRConfig } from "frappe-react-sdk";
import { Permission } from "@/core/utils/permission";
import { createPage } from "@/core/utils/route-guard";
import { useParams } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@atoms/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useCurrentChannelData } from "../../hooks/use-current-channel-data";
import { ErrorBanner } from "@atoms/frappe-error-banner";
import { ChannelMembersProvider } from "../../context/channel-members-provider";
import { DirectMessageSpace } from "./direct-message-space";
import { ChannelSpace } from "./channel-space";
import FullPageLoader from "@templates/full-page-loader.template";
import ForbiddenState from "@features/states/forbbiden-state";

const PERMISSIONS: Permission[] = [];
const DISPLAY_NAME = "ChatSpace";

export const Route: FC = () => {
  const { channelID } = useParams<{ channelID: string }>();

  if (!channelID) {
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Channel not found</AlertDescription>
      </Alert>
    );
  }

  const { channel, error, isLoading } = useCurrentChannelData(channelID);
  const { mutate, cache } = useSWRConfig();

  console.log("ChatSpace: currentChannel", channel);

  useEffect(() => {
    // setting last visited channel in local storage
    localStorage.setItem("ppLastChannel", channelID);

    //If the cached value of unread message count is 0, then no need to update it
    const channels = cache.get("unread_channel_count")?.data?.message?.channels;
    if (channels) {
      const cached_channel = channels.find(
        (channel: any) => channel.name === channelID,
      );
      if (cached_channel && cached_channel.unread_count === 0) {
      } else {
        mutate("unread_channel_count");
      }
    } else {
      mutate("unread_channel_count");
    }
  }, [channelID]);


  return (
    <div className="h-full pt-[70px] md:p-0 ">
      {isLoading && <FullPageLoader />}
      <ErrorBanner error={error} />
      {channel && (
        <ChannelMembersProvider channelID={channelID}>
          {channel.type === "dm" ? (
            <DirectMessageSpace channelData={channel.channelData} />
          ) : (
            <ChannelSpace channelData={channel.channelData} />
          )}
        </ChannelMembersProvider>
      )}
    </div>
  );
};

const Component = createPage(Route, PERMISSIONS, <ForbiddenState />);

Route.displayName = `${DISPLAY_NAME}`;
Component.displayName = DISPLAY_NAME;

export { Component };
