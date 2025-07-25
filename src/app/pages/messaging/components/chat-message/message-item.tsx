import {
  Avatar,
  Box,
  ContextMenu,
  Flex,
  HoverCard,
  Link,
  Separator,
  Text,
} from "@radix-ui/themes";

import { MessageContextMenu } from "./message-actions/message-actions";
import { DateTooltip, DateTooltipShort } from "./renderers/date-tooltip";
import { BoxProps } from "@radix-ui/themes/dist/cjs/components/box";
import { clsx } from "clsx";
import { UserAvatar, getInitials } from "../user-avatar";
import { useGetUser } from "../../hooks/use-get-user";
import { useIsUserActive } from "../../hooks/use-is-user-active";
import { UserFields } from "../../context/user-list-provider";
import { BsFillCircleFill } from "react-icons/bs";

import { TiptapRenderer } from "./renderers/tiptap-renderer/tiptap-renderer";
import { QuickActions } from "./message-actions/quick-actions/quick-actions";
import { memo, useContext } from "react";

import { Message, MessageBlock } from "@/types/Messaging/Message";
import { AuthContext } from "@/lib/auth/auth-provider";
import { generateAvatarColor } from "../generate-avatar-color";
import { Skeleton } from "../chat-skeleton";

interface MessageBlockProps {
  message: MessageBlock["data"];
  isScrolling: boolean;
  setDeleteMessage: (message: Message) => void;
  setEditMessage: (message: Message) => void;
  onReplyMessageClick: (messageID: string) => void;
}

export const MessageItem = ({
  message,
  setDeleteMessage,
  setEditMessage,
  isScrolling,
}: MessageBlockProps) => {
  const { name, owner: userID, creation: timestamp, is_continuation } = message;

  const { user, isActive } = useGetUserDetails(userID);

  const onDelete = () => {
    setDeleteMessage(message);
  };

  const onEdit = () => {
    setEditMessage(message);
  };

  const { currentUser } = useContext(AuthContext);

  const isOwner = currentUser === message.owner;

  return (
    <Box className="relative">
      <ContextMenu.Root>
        <ContextMenu.Trigger
          className="group 
                            hover:bg-gray-100
                            hover:transition-all
                            hover:delay-100
                            dark:hover:bg-gray-3 
                            data-[state=open]:bg-accent-2
                            dark:data-[state=open]:bg-gray-4
                            data-[state=open]:shadow-sm
                            p-2
                            rounded-md"
        >
          <Flex gap="3">
            <MessageLeftElement
              message={message}
              user={user}
              isActive={isActive}
              isScrolling={isScrolling}
            />
            <Flex direction="column" className="gap-0.5" justify="center">
              {!is_continuation ? (
                <Flex align="center" gap="2" mt="-1">
                  <UserHoverCard
                    user={user}
                    userID={userID}
                    isActive={isActive}
                  />
                  <Separator orientation="vertical" />
                  <DateTooltip timestamp={timestamp} />
                </Flex>
              ) : null}
              {/* Message content goes here */}

              {/* Show message according to type */}
              <MessageContent
                message={message}
                user={user}
                isScrolling={isScrolling}
                className={clsx(message.is_continuation ? "ml-0.5" : "")}
              />

              {message.is_edited === 1 && (
                <Text size="1" className="text-gray-10">
                  (edited)
                </Text>
              )}
            </Flex>
            {!isScrolling && (
              <QuickActions
                message={message}
                onDelete={onDelete}
                onEdit={onEdit}
                isOwner={isOwner}
              />
            )}
          </Flex>
        </ContextMenu.Trigger>
        {!isScrolling && (
          <MessageContextMenu
            message={message}
            onDelete={onDelete}
            onEdit={onEdit}
            isOwner={isOwner}
          />
        )}
      </ContextMenu.Root>
    </Box>
  );
};

interface MessageLeftElementProps extends BoxProps {
  message: MessageBlock["data"];
  user?: UserFields;
  isActive?: boolean;
  isScrolling?: boolean;
}
const MessageLeftElement = ({
  message,
  className,
  user,
  isActive,
  isScrolling,
  ...props
}: MessageLeftElementProps) => {
  // If it's a continuation, then show the timestamp

  // Else, show the avatar
  return (
    <Box
      className={clsx(
        message.is_continuation
          ? "invisible group-hover:visible flex items-center max-w-[32px] w-[32px]"
          : "",
        className,
      )}
      {...props}
    >
      {message.is_continuation ? (
        <DateTooltipShort timestamp={message.creation} />
      ) : (
        <MessageSenderAvatar
          userID={message.owner}
          user={user}
          isActive={isActive}
          isScrolling={isScrolling}
        />
      )}
    </Box>
  );
};

export const useGetUserDetails = (userID: string) => {
  const user = useGetUser(userID);

  const isActive = useIsUserActive(userID);

  return { user, isActive };
};

interface UserProps {
  user?: UserFields;
  userID: string;
  isScrolling?: boolean;
  isActive?: boolean;
}
export const MessageSenderAvatar = memo(
  ({ user, userID, isScrolling = false, isActive = false }: UserProps) => {
    const alt = user?.full_name ?? userID;
    return (
      <span className="relative inline-block">
        {!isScrolling ? (
          <Avatar
            color={generateAvatarColor(user?.full_name ?? userID)}
            src={user?.user_image}
            alt={user?.full_name ?? userID}
            loading="lazy"
            fallback={getInitials(alt)}
            size={"2"}
            radius={"medium"}
          />
        ) : (
          <Skeleton className={"rounded-md"} width={"6"} height={"6"} />
        )}
        {isActive && (
          <span
            className={clsx(
              "absolute block translate-x-1/2 translate-y-1/2 transform rounded-full",
              "bottom-0.5 right-0.5",
            )}
          >
            <span className="block h-2 w-2 rounded-full border border-slate-2 bg-green-600 shadow-md" />
          </span>
        )}
      </span>
    );
  },
);

export const UserHoverCard = memo(
  ({ user, userID, isActive, isScrolling = false }: UserProps) => {
    return (
      <HoverCard.Root>
        <HoverCard.Trigger>
          <Link className="text-gray-12" weight="medium" size="2">
            {user?.full_name ?? userID}
          </Link>
        </HoverCard.Trigger>
        {!isScrolling && (
          <HoverCard.Content size="1">
            <Flex gap="2" align="center">
              <UserAvatar
                src={user?.user_image}
                alt={user?.full_name ?? userID}
                size="4"
              />
              <Flex direction="column">
                <Flex gap="3" align="center">
                  <Text className="text-gray-12" weight="bold" size="3">
                    {user?.full_name ?? userID}
                  </Text>
                  {isActive && (
                    <Flex gap="1" align="center">
                      <BsFillCircleFill className="text-green-500" size="8" />
                      <Text className="text-gray-10" size="1">
                        Online
                      </Text>
                    </Flex>
                  )}
                </Flex>
                {user && (
                  <Text className="text-gray-11" size="1">
                    {user?.name}
                  </Text>
                )}
              </Flex>
            </Flex>
          </HoverCard.Content>
        )}
      </HoverCard.Root>
    );
  },
);
interface MessageContentProps extends BoxProps {
  user?: UserFields;
  message: Message;
  isScrolling?: boolean;
}
export const MessageContent = ({
  message,
  user,
  isScrolling = false,
  ...props
}: MessageContentProps) => {
  return (
    <Box {...props}>
      {message.text ? (
        <TiptapRenderer
          message={{
            ...message,
            message_type: "Text",
          }}
          user={user}
          isScrolling={isScrolling}
        />
      ) : null}
    </Box>
  );
};
