import { ChatHistory } from "./chat-history";
import {
  useFrappeDocumentEventListener,
  useFrappeEventListener,
  useFrappeGetCall,
} from "frappe-react-sdk";
import { Message, MessagesWithDate } from "@/types/Messaging/Message";
import { Suspense, lazy, useContext, useMemo, useState } from "react";
import {
  ChannelListItem,
  DMChannelListItem,
} from "@/app/pages/messaging/context/channel-list-provider";
import { useUserData } from "../../hooks/use-user-data";
import {
  ChannelMembersContext,
  ChannelMembersContextType,
} from "@/app/pages/messaging/context/channel-members-provider";

import { Flex, Box, IconButton } from "@radix-ui/themes";
import { BiX } from "react-icons/bi";
import { VirtuosoRefContext } from "../../context/virtuoso-ref-provider";
import { AuthContext } from "@/lib/auth/auth-provider";
import { ErrorBanner } from "@atoms/frappe-error-banner";
import { useSendMessage } from "../chat-input/use-send-message";
import { Loader } from "@atoms/loader";
import FullPageLoader from "@templates/full-page-loader.template";

const Tiptap = lazy(() => import("../chat-input/tip-tap"));

const COOL_PLACEHOLDERS = [
  "Delivering messages atop dragons 🐉 is available on a chargeable basis.",
  "Note 🚨: Service beyond the wall is currently disrupted due to bad weather.",
  "Pigeons just have better brand recognition tbh 🤷🏻",
  "Were you expecting a funny placeholder? 😂",
  "Want to know who writes these placeholders? 🤔. No one.",
  "Type a message...",
];
const randomPlaceholder =
  COOL_PLACEHOLDERS[Math.floor(Math.random() * COOL_PLACEHOLDERS.length)];
interface ChatBoxBodyProps {
  channelData: ChannelListItem | DMChannelListItem;
}

export const ChatBoxBody = ({ channelData }: ChatBoxBodyProps) => {
  const { virtuosoRef } = useContext(VirtuosoRefContext);
  const { currentUser } = useContext(AuthContext);
  const { data, error, mutate, isLoading } = useFrappeGetCall<{
    message: MessagesWithDate;
  }>(
    "parent_portal.api.pp_message.get_messages_with_dates",
    {
      channel_id: channelData.name,
    },
    `get_messages_for_channel_${channelData.name}`,
    {
      revalidateOnFocus: false,
    },
  );

  useFrappeDocumentEventListener("PP Channel", channelData.name, () => {});

  useFrappeEventListener("message_updated", (data) => {
    //If the message is sent on the current channel
    if (data.channel_id === channelData.name) {
      //If the sender is not the current user
      if (data.sender !== currentUser) {
        mutate();
      } else {
        virtuosoRef?.current?.scrollToIndex({
          index: "LAST",
          align: "end",
          behavior: "smooth",
        });
      }
    }
  });

  const { name: user } = useUserData();
  const { channelMembers } = useContext(
    ChannelMembersContext,
  ) as ChannelMembersContextType;

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const handleReplyAction = (message: Message) => {
    setSelectedMessage(message);
  };

  const handleCancelReply = () => {
    setSelectedMessage(null);
  };

  const isUserInChannel = useMemo(() => {
    if (user && channelMembers) {
      return user in channelMembers;
    }
    return false;
  }, [user, channelMembers]);

  const { sendMessage, loading } = useSendMessage(
    channelData.name,
    selectedMessage,
  );

  if (isLoading) {
    //TODO: Replace with skeleton loader
    return <FullPageLoader />;
  }

  if (error) {
    return (
      <Box p="2" pt="9" className="h-screen">
        <ErrorBanner error={error} />
      </Box>
    );
  }

  if (data) {
    return (
      <Flex
        height="100%"
        direction="column"
        justify={"end"}
        p="4"
        pt="9"
        className="overflow-hidden"
      >
        {isLoading ? (
          <FullPageLoader className="w-full" />
        ) : (
          <ChatHistory
            parsedMessages={data.message}
            replyToMessage={handleReplyAction}
            channelData={channelData}
          />
        )}
        {channelData?.is_archived == 0 &&
          (isUserInChannel || channelData?.type === "Open") && (
            <Suspense
              fallback={
                <Flex align="center" justify="center" width="100%" height="9">
                  <Loader />
                </Flex>
              }
            >
              <Tiptap
                key={channelData.name}
                clearReplyMessage={handleCancelReply}
                placeholder={randomPlaceholder}
                replyMessage={selectedMessage}
                sessionStorageKey={`tiptap-${channelData.name}`}
                onMessageSend={sendMessage}
                messageSending={loading}
              />
            </Suspense>
          )}
      </Flex>
    );
  }

  return null;
};
